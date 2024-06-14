using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class ReviewConvertor
    {
        public static Review ConvertToDto(this ReviewRequest review)
        {
            var entity = new Review()
            {
                Rate = review.Rate,
                Comment = review.Comment.ConvertToDto(),
                RecipeId = new Guid(review.RecipeId),
                OwnerUserName = review.OwnerUserName,
                OwnerId = review.OwnerId,
            };

            if (review.Id != null)
            {
                entity.Id = review.Id;
            }

            return entity;
        }
    }
}
