using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class ReviewRequest : BaseRequest
    {
        [Required(ErrorMessage = "Rate is required.")]
        public int Rate { get; set; }

        public CommentRequest Comment { get; set; }

        [Required(ErrorMessage = "Recipe id is required.")]
        public string RecipeId { get; set; }

        public string? OwnerUserName { get; set; }

        [Required(ErrorMessage = "Owner id is required.")]
        public string OwnerId { get; set; }
    }
}
