using Microsoft.AspNetCore.Http;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class RecipeConvertor
    {
        public static Recipe ConvertToDto(this RecipeRequest recipe)
        {
            List<CookingStep> cookingSteps = new List<CookingStep>();
            foreach (var item in recipe.CookingSteps)
                cookingSteps.Add(item.ConvertToDto());

            List<Ingredient> ingredients = new List<Ingredient>();
            foreach (var item in recipe.Ingredients)
                ingredients.Add(item.ConvertToDto());

            List<Review> reviews = new List<Review>();
            foreach (var item in recipe.Reviews)
                reviews.Add(item.ConvertToDto());

            var recipeDto = new Recipe
            {
                Title = recipe.Title,
                Description = recipe.Description ?? "",
                Calorie = recipe.Calorie ?? 0,
                RecipeCategory = recipe.RecipeCategory.ConvertToDto(),
                PreparationTimeInMinutes = recipe.PreparationTimeInMinutes ?? 0,
                CookingTimeInMinutes = recipe.CookingTimeInMinutes ?? 0,
                Photo = recipe.Photo is not null ? recipe.Photo.ConvertToPhoto() : null,
                Video = recipe.Video is not null ? recipe.Video.ConvertToVideo() : null,
                ServingSize = recipe.ServingSize ?? 0,
                CookingSteps = cookingSteps,
                Ingredients = ingredients,
                AvgRaiting = recipe.AvgRaiting,
                Reviews = reviews,
                OwnerId = recipe.OwnerId
            };

            if (recipe.Id != null)
            {
                recipeDto.Id = recipe.Id;
            }

            return recipeDto;
        }

        public static RecipeFile ConvertToExportFile(this Recipe recipe)
        {
            List<CookingStepFile> cookingSteps = new List<CookingStepFile>();
            foreach (var item in recipe.CookingSteps) 
                cookingSteps.Add(item.ConvertToExportFile());

            List<IngredientFile> ingredients = new List<IngredientFile>();
            foreach (var item in recipe.Ingredients)
                ingredients.Add(item.ConvertToExportFile());

            var recipeDto = new RecipeFile
            {
                Title = recipe.Title,
                Description = recipe.Description ?? "",
                Calorie = recipe.Calorie,
                RecipeCategory = recipe.RecipeCategory.ConvertToExportFile(),
                PreparationTimeInMinutes = recipe.PreparationTimeInMinutes,
                CookingTimeInMinutes = recipe.CookingTimeInMinutes,
                ServingSize = recipe.ServingSize,
                CookingSteps = cookingSteps,
                Ingredients = ingredients,
            };

            return recipeDto;
        }
    }
}
