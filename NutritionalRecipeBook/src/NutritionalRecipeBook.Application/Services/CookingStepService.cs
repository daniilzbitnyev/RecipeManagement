using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;

namespace NutritionalRecipeBook.Application.Services
{
    public class CookingStepService : ICookingStepService
    {
        private readonly IGenericRepository<CookingStep> _repository;

        private readonly ICookingStepRepository _cookingStepRepository;

        public CookingStepService(IGenericRepository<CookingStep> repository, ICookingStepRepository cookingStepRepository)
        {
            _repository = repository;
            _cookingStepRepository = cookingStepRepository;
        }

        public async Task CreateAsync(CookingStepRequest cookingStep)
        {
            await _repository.AddAsync(cookingStep.ConvertToDto());
        }

        public async Task<CookingStep> GetByIdAsync(Guid cookingStepId)
        {
           return await _cookingStepRepository.GetByIdAsync(cookingStepId);
        }

        public async Task UpdateAsync(CookingStepRequest cookingStep)
        {
            await _cookingStepRepository.UpdateAsync(cookingStep.ConvertToDto());
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.RemoveAsync(id);
        }
    }
}
