using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class ProductConvertor
    {
        public static Product ConvertToDto(this ProductRequest product)
        {
            var entity = new Product()
            {
                Name = product.Name,
                Calorie = product.Calorie
            };

            if (product.Id != null)
            {
                entity.Id = product.Id;
            }

            return entity;
        }

        public static ProductFile ConvertToExportFile(this Product product)
        {
             var entity = new ProductFile()
            {
                Name = product.Name,
                Calorie = product.Calorie
            };

            return entity;
        }
    }
}
