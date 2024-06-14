using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class IngredientConvertor
    {
        public static Ingredient ConvertToDto(this IngredientRequest ingredient)
        {
            var entity = new Ingredient()
            {
                Quantity = ingredient.Quantity,
                Product = ingredient.Product?.ConvertToDto(),
                Measurement = ingredient.Measurement?.ConvertToDto(),
                RecipeId = ingredient.RecipeId is null ? null : new Guid(ingredient.RecipeId)
             };

            if (ingredient.Id != null)
            {
                entity.Id = ingredient.Id;
            }

            return entity;
        }

        public static IngredientFile ConvertToExportFile(this Ingredient ingredient)
        {
            var entity = new IngredientFile()
            {
                Quantity = ingredient.Quantity,
                Product = ingredient.Product?.ConvertToExportFile(),
                Measurement = ingredient.Measurement?.ConvertToExportFile(),
            };

            return entity;
        }
    }
}
