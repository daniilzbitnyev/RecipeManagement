using Microsoft.AspNetCore.Http;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class ImportRequest
    {
        public IFormFile File { get; set; }

        public string OwnerId { get; set; }
    }
}
