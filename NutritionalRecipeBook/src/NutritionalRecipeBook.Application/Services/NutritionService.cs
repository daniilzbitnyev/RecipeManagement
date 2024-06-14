using Microsoft.Extensions.Configuration;
using NutritionalRecipeBook.Application.Constants;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Responses;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace NutritionalRecipeBook.Application.Services
{
    public class NutritionService : INutritionService
    {
        private readonly IHttpClientFactory _factory;

        private readonly IConfiguration _configuration;

        public NutritionService(IHttpClientFactory factory, IConfiguration configuration)
        {
             _factory = factory;
            _configuration = configuration;
        }

        public async Task<double?> GetFoodCalorieAsync(string foodName)
        {
            using HttpClient httpClient = _factory.CreateClient();

            var requestUrl = _configuration["NutritionAPI:Url"];
            httpClient.DefaultRequestHeaders.Add("x-app-id", _configuration["NutritionAPI:X-App-Id"]);
            httpClient.DefaultRequestHeaders.Add("x-app-key", _configuration["NutritionAPI:X-App-Key"]);

            var response = await httpClient.PostAsJsonAsync(requestUrl, new { Query = foodName });

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var foodsResponse = JsonSerializer.Deserialize<FoodsResponse>(content);

            double calorie = 0.0;

            foreach (var food in foodsResponse.foods)
            {
                calorie += food.nf_calories;
            }

            return calorie;
        }

        public async Task<string> GenerateQuery(double quantity, string measurementType, string productName)
        {
            return $"{quantity} {measurementType} {productName}";
        }

        public async Task<double> GetCountRecipeCalories(RecipeRequest entity)
        {
            string query = await GetTheLastQueryString(entity.Ingredients);

            return (double)await GetFoodCalorieAsync(query);
        }

        public async Task<double> GetCountRecipeCalories(RecipeCalorieRequest entity)
        {
            string query = await GetTheLastQueryString(entity.Ingredients);

            return (double)await GetFoodCalorieAsync(query);
        }

        private async Task<string> GetTheLastQueryString(List<IngredientRequest> ingredients)
        {
            StringBuilder query = new StringBuilder();

            if (ingredients is not null)
            {
                foreach (var ingredient in ingredients)
                {
                    query.Append(await GenerateQuery(ingredient.Quantity, ingredient?.Measurement?.Name, ingredient.Product.Name) + QueryConstants.LastString);
                }
            }

            return RemoveLastAdditionalString(query.ToString());
        }

        private string RemoveLastAdditionalString(string query)
        {
            if (query.LastIndexOf(QueryConstants.LastIndexOfQuery) != -1)
            {
                query.Remove(query.LastIndexOf(QueryConstants.LastIndexOfQuery), QueryConstants.LastIndexOfQuery.Length);
            }

            return query;
        }
    }
}
