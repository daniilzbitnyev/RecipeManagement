using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class RecipeRequest : BaseRequest
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; }

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        public double? Calorie { get; set; }

        public VideoRequest? Video { get; set; }

        public RecipeCategoryRequest? RecipeCategory { get; set; }

        [Range(1, 1440, ErrorMessage = "Preparation time must be between 1 and 1440 minutes.")]
        public int? PreparationTimeInMinutes { get; set; }

        [Range(1, 1440, ErrorMessage = "Cooking time must be between 1 and 1440 minutes.")]
        public int? CookingTimeInMinutes { get; set; }

        [Range(1, 100, ErrorMessage = "Serving size must be between 1 and 100.")]
        public int? ServingSize { get; set; }

        public PhotoRequest? Photo { get; set; }

        public int AvgRaiting { get; set; }

        public List<CookingStepRequest> CookingSteps { get; set; } = new List<CookingStepRequest>();

        public List<IngredientRequest> Ingredients { get; set; } = new List<IngredientRequest>();


        public List<ReviewRequest> Reviews { get; set; } = new List<ReviewRequest>();

        public string OwnerId { get; set; }
    }
}
