using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/recipeCategory")]
    [Authorize]
    public class RecipeCategoryController : ControllerBase
    {
        private readonly IRecipeCategoryService _recipeCategoryService;

        public RecipeCategoryController(IRecipeCategoryService recipeCategoryService)
        {
            _recipeCategoryService = recipeCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeCategory>>> GetAll()
        {
            return Ok(await _recipeCategoryService.GetAll());
        }
    }
}
