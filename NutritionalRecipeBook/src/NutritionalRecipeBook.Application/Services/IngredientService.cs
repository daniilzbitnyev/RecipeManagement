using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;

namespace NutritionalRecipeBook.Application.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IGenericRepository<Ingredient> _repository;

        private readonly IIngredientRepository _ingredientRepository;

        public IngredientService(IGenericRepository<Ingredient> repository, IIngredientRepository ingredientRepository)
        {
            _repository = repository;
            _ingredientRepository = ingredientRepository;
        }

        public async Task<Ingredient> GetByIdAsync(Guid ingredientId)
        {
            return await _ingredientRepository.GetByIdAsync(ingredientId);
        }

        public async Task CreateAsync(IngredientRequest ingredient)
        {
            await _ingredientRepository.AddAsync(ingredient.ConvertToDto());
        }

        public async Task UpdateAsync(IngredientRequest ingredient)
        {
            await _ingredientRepository.UpdateAsync(ingredient.ConvertToDto());
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.RemoveAsync(id);
        }
    }
}
