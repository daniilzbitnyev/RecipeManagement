using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;

namespace NutritionalRecipeBook.Application.Services
{
    public class RecipeCategoryService : IRecipeCategoryService
    {
        private readonly IGenericRepository<RecipeCategory> _repository;

        public RecipeCategoryService(IGenericRepository<RecipeCategory> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RecipeCategory>> GetAll()
        {
            return await _repository.GetAllAsync();
        }
    }
}
