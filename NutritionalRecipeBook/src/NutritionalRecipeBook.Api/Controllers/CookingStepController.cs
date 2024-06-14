using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class CookingStepController : ControllerBase
    {
        private readonly ICookingStepService _cookingStepService;

        private readonly IFileService _fileService;

        public CookingStepController(ICookingStepService cookingStepService, IFileService fileService)
        {
            _cookingStepService = cookingStepService;
            _fileService = fileService;
        }

        [HttpGet]
        [Route("{cookingStepId}")]
        public async Task<ActionResult<CookingStep>> GetById(string cookingStepId)
        {
            if (string.IsNullOrEmpty(cookingStepId))
            {
                return BadRequest();
            }

            var entity = await _cookingStepService.GetByIdAsync(new Guid(cookingStepId));

            if (entity is null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CookingStepRequest cookingStep)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (cookingStep.Photos is not null)
            {
                foreach (var photo in cookingStep.Photos)
                {
                    photo.ImageName = await _fileService.SaveFile(photo.Data, "Images");
                }
            }

            await _cookingStepService.CreateAsync(cookingStep);

            return Created();
        }

        [HttpPut]
        [Route("{cookingStepId}")]
        public async Task<IActionResult> Update(string cookingStepId, [FromForm] CookingStepRequest cookingStep)
        {
            if (string.IsNullOrEmpty(cookingStepId) || !ModelState.IsValid)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(cookingStepId) || !Guid.TryParse(cookingStepId, out Guid parsedIngredientId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            cookingStep.Id = parsedIngredientId;

            if (cookingStep.Photos is not null)
            {
                foreach (var photo in cookingStep.Photos)
                {
                    photo.ImageName = await _fileService.SaveFile(photo.Data, "Images");
                }
            }

            await _cookingStepService.UpdateAsync(cookingStep);

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

            await _cookingStepService.DeleteAsync(parsedIngredientId);

            return Ok();
        }
    }
}
