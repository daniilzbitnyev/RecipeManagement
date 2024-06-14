using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class IngredientRequest : BaseRequest
    {
        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0, float.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
        public float Quantity { get; set; }

        public ProductRequest? Product { get; set; }

        public MeasurementTypeRequest? Measurement { get; set; }

        [Required(ErrorMessage = "Recipe id is required.")]
        public string RecipeId { get; set; }
    }
}
