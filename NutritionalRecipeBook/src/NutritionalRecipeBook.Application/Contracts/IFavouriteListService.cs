using NutritionalRecipeBook.Application.DTOs.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IFavouriteListService
    {
        Task CreateAsync(FavouriteListRequest favouriteList);

        Task<bool> RemoveByUsersIdAndRecipesId(Guid recipeId, string userId);
    }
}
