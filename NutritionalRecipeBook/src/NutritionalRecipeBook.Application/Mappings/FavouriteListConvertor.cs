using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class FavouriteListConvertor
    {
        public static FavouriteList ConvertTo(this FavouriteListRequest favouriteList)
        {
            var entity = new FavouriteList()
            {
                RecipesId = new Guid(favouriteList.RecipesId),
                UsersId = favouriteList.UsersId
            };

            return entity;
        }
    }
}
