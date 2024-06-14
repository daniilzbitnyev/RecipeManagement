using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;

namespace NutritionalRecipeBook.Application.Services
{
    public class MeasurementTypeService : IMeasurementTypeService
    {
        private readonly IGenericRepository<MeasurementType> _repository;

        public MeasurementTypeService(IGenericRepository<MeasurementType> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MeasurementType>> GetAll()
        {
            return await _repository.GetAllAsync();
        }
    }
}
