using NutritionalRecipeBook.Application.DTOs.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface INutritionService
    {
        Task<double?> GetFoodCalorieAsync(string foodName);

        Task<string> GenerateQuery(double quantity, string measurementType, string productName);

        Task<double> GetCountRecipeCalories(RecipeRequest entity);

        Task<double> GetCountRecipeCalories(RecipeCalorieRequest entity);
    }
}
