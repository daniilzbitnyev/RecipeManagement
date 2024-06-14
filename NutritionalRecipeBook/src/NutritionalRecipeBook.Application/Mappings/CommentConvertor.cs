using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class CommentConvertor
    {
        public static Comment ConvertToDto(this CommentRequest comment)
        {
            var entity = new Comment()
            {
                Text = comment.Text,
            };

            if (comment.Id != null)
            {
                entity.Id = comment.Id;
            }

            return entity;
        }

    }
}
