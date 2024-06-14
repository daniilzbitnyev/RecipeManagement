using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IRecipeService
    {
        Task<PagedList<Recipe>> GetMembersAsync(FilterParams recipeParams);

        Task<Recipe> GetById(Guid id, string? userId);

        Task Create(RecipeRequest recipe);

        Task CreateRange(List<RecipeRequest> recipeRequests);

        Task Update(RecipeRequest recipe);

        Task UpdateCalorie(double calorie, Guid recipeId);

        Task UpdateAvgRaiting(Guid recipeId);

        Task<bool> Delete(Guid id);
    }
}
