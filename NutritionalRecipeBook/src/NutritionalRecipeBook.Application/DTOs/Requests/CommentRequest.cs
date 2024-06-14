using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class CommentRequest : BaseRequest
    {
        public string Text { get; set; }
    }
}
