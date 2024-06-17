using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Responses;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/review")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        private readonly IRecipeService _recipeService;

        private readonly UserManager<ApplicationUser> _userManager;

        public ReviewController(IReviewService reviewService, IRecipeService recipeService, UserManager<ApplicationUser> userManager)
        {
            _recipeService = recipeService;
            _reviewService = reviewService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] FilterParams recipeParams)
        {
            var reviews = await _reviewService.GetMembersAsync(recipeParams);

            var entities = new PagedReviewListResponse(reviews, reviews.TotalPages, reviews.TotalCount);

            return Ok(entities);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReviewRequest reviewRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(reviewRequest.OwnerId);

            if (user is null)
            {
                return NotFound();
            }

            reviewRequest.OwnerUserName = user.UserName;

            await _reviewService.CreateAsync(reviewRequest.ConvertToDto());

            if (string.IsNullOrWhiteSpace(reviewRequest.RecipeId) || !Guid.TryParse(reviewRequest.RecipeId, out Guid parsedRecipeId))
            {
                return BadRequest(new { message = "Invalid ID format." });
            }

            await _recipeService.UpdateAvgRaiting(parsedRecipeId);

            return Created();
        }
    }
}
