using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class MeasurementTypeConvertor
    {
        public static MeasurementType ConvertToDto(this MeasurementTypeRequest measurementType)
        {
            var entity = new MeasurementType()
            {
                Name = measurementType.Name
            };

            if (measurementType.Id != null)
            {
                entity.Id = measurementType.Id;
            }

            return entity;
        }

        public static MeasurementTypeFile ConvertToExportFile(this MeasurementType measurementType)
        {
            var entity = new MeasurementTypeFile()
            {
                Name = measurementType.Name
            };

            return entity;
        }
    }
}
