using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.DTOs.Responses
{
    public record PagedRecipeListResponse(PagedList<Recipe> Recipes, int TotalPages);
}
