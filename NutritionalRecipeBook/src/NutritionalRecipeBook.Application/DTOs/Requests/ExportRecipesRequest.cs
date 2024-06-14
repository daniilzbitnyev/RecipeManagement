using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class ExportRecipesRequest
    {
        public List<RecipeFile> Recipes { get; set; }
    }
}
