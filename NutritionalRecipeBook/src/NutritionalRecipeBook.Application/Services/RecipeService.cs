using NLog;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;

namespace NutritionalRecipeBook.Application.Services
{
    public class RecipeService : IRecipeService
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        private readonly IGenericRepository<Recipe> _repository;

        private readonly IRecipeRepository _recipeRepository;

        public RecipeService(IGenericRepository<Recipe> repository, IRecipeRepository recipeRepository)
        {
            _repository = repository;
            _recipeRepository = recipeRepository;
        }

        public async Task<PagedList<Recipe>> GetMembersAsync(FilterParams recipeParams)
        {
            return await _recipeRepository.GetRecipes(recipeParams);
        }

        public async Task<Recipe> GetById(Guid id, string? userId)
        {
            return await _recipeRepository.GetById(id, userId);
        }

        public async Task Create(RecipeRequest recipe)
        {
            await _recipeRepository.AddAsync(recipe.ConvertToDto());
            _logger.Info("Added entity successfully");
        }

        public async Task CreateRange(List<RecipeRequest> recipeRequests)
        {
            List<Recipe> recipes = new List<Recipe>();
            foreach (var recipe in recipeRequests)
            {
                recipes.Add(recipe.ConvertToDto());
            }
            await _recipeRepository.AddRangeAsync(recipes);
            _logger.Info("Added range entities successfully");
        }

        public async Task Update(RecipeRequest recipe)
        {
            await _recipeRepository.UpdateAsync(recipe.ConvertToDto());
            _logger.Info("Updated entity successfully");
        }

        public async Task UpdateCalorie(double calorie, Guid recipeId)
        {
            await _recipeRepository.UpdateCalorie(calorie, recipeId);
        }

        public async Task UpdateAvgRaiting(Guid recipeId)
        {
            await _recipeRepository.UpdateAvgRaiting(recipeId);
        }

        public async Task<bool> Delete(Guid id)
        {
            return await _recipeRepository.DeleteAsync(id);
        }
    }
}
