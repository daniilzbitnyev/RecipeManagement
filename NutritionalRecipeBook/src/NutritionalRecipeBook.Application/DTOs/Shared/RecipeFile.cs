using NutritionalRecipeBook.Application.DTOs.Shared;

namespace NutritionalRecipeBook.Domain.Entities
{
    public class RecipeFile
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Calorie { get; set; }

        public RecipeCategoryFile? RecipeCategory { get; set; }
        
        public int PreparationTimeInMinutes { get; set; }

        public int CookingTimeInMinutes { get; set; }

        public int ServingSize { get; set; }

        public List<CookingStepFile> CookingSteps { get; set; } = new List<CookingStepFile>();

        public List<IngredientFile> Ingredients { get; set; } = new List<IngredientFile>();
    }
}
