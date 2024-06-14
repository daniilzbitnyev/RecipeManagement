using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class RecipeCalorieRequest
    {
        [MinLength(1, ErrorMessage = "Minimum length of ingredients should be one.")]
        public List<IngredientRequest> Ingredients { get; set; }
        
        [Required(ErrorMessage = "Recipe id is required.")]
        public string RecipeId { get; set; }
    }
}
