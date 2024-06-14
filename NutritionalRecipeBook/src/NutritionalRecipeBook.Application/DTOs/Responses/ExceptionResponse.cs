using System.Net;

namespace NutritionalRecipeBook.Application.DTOs
{
    public record ExceptionResponse(HttpStatusCode StatusCode, string Description);
}
