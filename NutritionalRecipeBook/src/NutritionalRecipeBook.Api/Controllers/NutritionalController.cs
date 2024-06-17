using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/nutritional")]
    [Authorize]
    public class NutritionalController : ControllerBase
    {
        private readonly INutritionService _nutritionService;

        private readonly IRecipeService _recipeService;

        public NutritionalController(INutritionService nutritionService, IRecipeService recipeService)
        {
            _nutritionService = nutritionService;
            _recipeService = recipeService;
        }

        [HttpPost]
        public async Task<ActionResult<double>> GetRecipeCalories([FromBody] RecipeCalorieRequest recipeCalorie)
        {
            double calorie = await _nutritionService.GetCountRecipeCalories(recipeCalorie);

            if (string.IsNullOrWhiteSpace(recipeCalorie.RecipeId) || !Guid.TryParse(recipeCalorie.RecipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            await _recipeService.UpdateCalorie(calorie, parsedRecipeId);

            return Ok(calorie);
        }
    }
}
