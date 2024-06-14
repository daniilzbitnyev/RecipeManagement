using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Targets;
using NutritionalRecipeBook.Application.Constants;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Responses;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Application.Services;
using NutritionalRecipeBook.Domain.Entities;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        private readonly IRecipeService _recipeService;

        private readonly IFileService _fileService;

        private readonly INutritionService _nutritionalService;

        public RecipeController(IRecipeService recipeService, IFileService fileService, INutritionService nutritionService)
        {
            _recipeService = recipeService;
            _fileService = fileService;
            _nutritionalService = nutritionService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedRecipeListResponse>> GetAll([FromQuery] FilterParams recipeParams)
        {
            var recipes = await _recipeService.GetMembersAsync(recipeParams);

            var entities = new PagedRecipeListResponse(recipes, recipes.TotalPages);

            return Ok(entities);
        }

        [HttpGet("{recipeId}/{userId}")]
        public async Task<IActionResult> GetById(string recipeId, string? userId)
        {
            if (recipeId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(recipeId) || !Guid.TryParse(recipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            Recipe recipe = new Recipe();

            if (!string.IsNullOrEmpty(userId))
            {

                recipe = await _recipeService.GetById(parsedRecipeId, userId);
            }
            else
            {
                recipe = await _recipeService.GetById(parsedRecipeId, null);
            }

            if (recipe is null)
            {
                return NotFound();
            }

            if (recipe.Photo is not null)
            {
                recipe.Photo.ImageSrc = await _fileService.CreateFileSrc(Request.Scheme, Request.Host, Request.PathBase, "Images", recipe.Photo.ImageName);
            }

            if (recipe.Video is not null)
            {
                recipe.Video.VideoSrc = await _fileService.CreateFileSrc(Request.Scheme, Request.Host, Request.PathBase, "Videos", recipe.Video.VideoName);
            }

            if (recipe.CookingSteps is not null)
            {
                foreach (var step in recipe.CookingSteps)
                {
                    foreach (var photo in step.Photos)
                    {
                        photo.ImageSrc = await _fileService.CreateFileSrc(Request.Scheme, Request.Host, Request.PathBase, "Images", photo.ImageName);
                    }
                }
            }

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] RecipeRequest recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (recipe.Photo is not null)
            {
                recipe.Photo.ImageName = await _fileService.SaveFile(recipe.Photo.Data, "Images");
            }

            if (recipe.Video.Data is not null)
            {
                recipe.Video.VideoName = await _fileService.SaveFile(recipe.Video.Data, "Videos");
            }
            else
            {
                recipe.Video = null;
            }

            await _recipeService.Create(recipe);

            return Created();
        }

        [HttpPut("{recipeId}")]
        public async Task<IActionResult> Update([FromForm] RecipeRequest recipe, string recipeId)
        {
            if (!ModelState.IsValid || recipeId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(recipeId) || !Guid.TryParse(recipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            recipe.Id = parsedRecipeId;

            if (recipe.Photo is not null)
            {
                recipe.Photo.ImageName = await _fileService.SaveFile(recipe.Photo.Data, "Images");
            }

            if (recipe.Video.Data is not null)
            {
                recipe.Video.VideoName = await _fileService.SaveFile(recipe.Video.Data, "Videos");
            }
            else
            {
                recipe.Video = null;
            }

            var existedRecipe = await _recipeService.GetById(parsedRecipeId, null);

            if (existedRecipe != null)
            {
                await _recipeService.Update(recipe);

                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> Delete(string recipeId)
        {
            if (recipeId.IsNullOrEmpty())
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(recipeId) || !Guid.TryParse(recipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            var existedRecipe = await _recipeService.GetById(parsedRecipeId, null);

            if (existedRecipe != null)
            {
                await _recipeService.Delete(parsedRecipeId);

                return Ok();
            }

            return NotFound();
        }

        [HttpPost]
        [Route("import")]
        public async Task<IActionResult> Import([FromForm] ImportRequest importRequest)
        {
            var entities = await _fileService.DeserializeFileToJson(importRequest);

            if (entities is null)
            {
                return BadRequest(new { message = "Cannot deserialize file." });
            }

            foreach (var entity in entities)
            {
                if (entity.Ingredients.Count != 0)
                {
                    entity.Calorie = await _nutritionalService.GetCountRecipeCalories(entity);
                }

                entity.OwnerId = importRequest.OwnerId;
            }


            await _recipeService.CreateRange(entities);

            return Ok();
        }

        [HttpPost]
        [Route("export")]
        public async Task<IActionResult> Export([FromBody] ExportRecipesRequest recipes)
        {
            var jsonBytes = await _fileService.SerializeJson(recipes.Recipes);

            if (jsonBytes is null)
            {
                return BadRequest(new { message = "Cannot convert to json." });
            }

            return File(jsonBytes, "application/json", $"recipes.json");
        }

        [HttpGet]
        [Route("export/{recipeId}")]
        public async Task<IActionResult> Export(string recipeId)
        {
            if (string.IsNullOrWhiteSpace(recipeId))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(recipeId) || !Guid.TryParse(recipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            var existedRecipe = await _recipeService.GetById(parsedRecipeId, null);

            if (existedRecipe is null)
            {
                return NotFound();
            }

            var jsonBytes = await _fileService.SerializeJson(new List<RecipeFile>() { existedRecipe.ConvertToExportFile() });

            if (jsonBytes is null)
            {
                return BadRequest(new { message = "Cannot convert to json." });
            }

            return File(jsonBytes, "application/json", $"recipe_{existedRecipe.Title}.json");
        }
    }
}
