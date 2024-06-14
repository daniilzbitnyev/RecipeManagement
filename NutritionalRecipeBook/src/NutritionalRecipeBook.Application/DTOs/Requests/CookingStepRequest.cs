using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class CookingStepRequest : BaseRequest
    {
        [Required(ErrorMessage = "Step number is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Step number must be greater than zero.")]
        public int NumberStep { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Recipe Id is required.")]
        public string RecipeId { get; set; }

        public List<PhotoRequest> Photos { get; set; } = new List<PhotoRequest>();
    }
}
