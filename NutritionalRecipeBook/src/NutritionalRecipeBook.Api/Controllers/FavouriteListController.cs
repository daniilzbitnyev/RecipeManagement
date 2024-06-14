using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class FavouriteListController : ControllerBase
    {
        private readonly IFavouriteListService _favouriteListService;

        public FavouriteListController(IFavouriteListService favouriteListService)
        {
            _favouriteListService = favouriteListService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FavouriteListRequest favouriteList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _favouriteListService.CreateAsync(favouriteList);

            return Created();
        }

        [HttpDelete]
        [Route("{userId}/{recipeId}")]
        public async Task<IActionResult> RemoveFromFavouriteList(string userId, string recipeId)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(recipeId))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(recipeId) || !Guid.TryParse(recipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            await _favouriteListService.RemoveByUsersIdAndRecipesId(parsedRecipeId, userId);

            return Ok();
        }
    }
}
