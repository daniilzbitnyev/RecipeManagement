using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Infrastructure.Contracts
{
    public interface IRecipeRepository
    {
        Task<PagedList<Recipe>> GetRecipes(FilterParams recipeParams);

        Task<Recipe> GetById(Guid id, string? userId);

        Task AddAsync(Recipe recipe);

        Task AddRangeAsync(List<Recipe> recipes);

        Task UpdateAsync(Recipe recipe);

        Task UpdateCalorie(double calorie, Guid recipeId);

        Task UpdateAvgRaiting(Guid recipeId);

        Task<bool> DeleteAsync(Guid id);
    }
}
