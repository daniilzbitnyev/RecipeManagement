using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class RecipeCategoryConvertor
    {
        public static RecipeCategory ConvertToDto(this RecipeCategoryRequest recipeCategory)
        {
            var entity = new RecipeCategory()
            {
                Name = recipeCategory.Name
            };

            if (recipeCategory.Id != null)
            {
                entity.Id = recipeCategory.Id;
            }

            return entity;
        }

        public static RecipeCategoryRequest ConvertFromDto(this RecipeCategory recipeCategory)
        {
            var entity = new RecipeCategoryRequest()
            {
                Name = recipeCategory.Name
            };

            if (recipeCategory.Id != null)
            {
                entity.Id = recipeCategory.Id;
            }

            return entity;
        }

        public static RecipeCategoryFile ConvertToExportFile(this RecipeCategory recipeCategory)
        {
            var entity = new RecipeCategoryFile()
            {
                Name = recipeCategory.Name
            };

            return entity;
        }
    }
}
