using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class PhotoRequest : BaseRequest
    {
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string? Title { get; set; }

        public string? ImageName { get; set; }

        public IFormFile? Data { get; set; }

        public string? ImageSrc { get; set; }
    }
}
