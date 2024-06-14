using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.Services;
using NutritionalRecipeBook.Domain.Entities;
using System.Runtime.InteropServices;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        private readonly INutritionService _nutritionalService;

        private readonly IRecipeService _recipeService;

        public IngredientController(IIngredientService ingredientService, INutritionService nutritionalService, IRecipeService recipeService)
        {
            _ingredientService = ingredientService;
            _nutritionalService = nutritionalService;
            _recipeService = recipeService;
        }

        [HttpGet]
        [Route("{ingredientId}")]
        public async Task<ActionResult<Ingredient>> GetById(string ingredientId)
        {
            if (string.IsNullOrEmpty(ingredientId))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(ingredientId) || !Guid.TryParse(ingredientId, out Guid parsedIngredientId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            var entity = await _ingredientService.GetByIdAsync(parsedIngredientId);

            if (entity is null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPost]
        public async Task<IActionResult> Create(IngredientRequest ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ingredient.Product.Calorie = await _nutritionalService.GetFoodCalorieAsync(await _nutritionalService.GenerateQuery(ingredient.Quantity, ingredient.Measurement.Name, ingredient.Product.Name));

            await _ingredientService.CreateAsync(ingredient);

            return Created();
        }

        [HttpPut]
        [Route("{ingredientId}")]
        public async Task<IActionResult> Update(string ingredientId, IngredientRequest ingredient)
        {
            if (string.IsNullOrEmpty(ingredientId) || !ModelState.IsValid)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(ingredientId) || !Guid.TryParse(ingredientId, out Guid parsedIngredientId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            ingredient.Id = parsedIngredientId;

            ingredient.Product.Calorie = await _nutritionalService.GetFoodCalorieAsync(await _nutritionalService.GenerateQuery(ingredient.Quantity, ingredient.Measurement.Name, ingredient.Product.Name));

            await _ingredientService.UpdateAsync(ingredient);

            return Ok();
        }

        
        [HttpDelete]
        [Route("{cookingStepId}")]
        public async Task<IActionResult> Delete(string cookingStepId)
        {
            if (string.IsNullOrEmpty(cookingStepId))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(cookingStepId) || !Guid.TryParse(cookingStepId, out Guid parsedIngredientId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            await _ingredientService.DeleteAsync(parsedIngredientId);

            return Ok();
        }
    }
}
