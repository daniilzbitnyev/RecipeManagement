using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Contracts
{
    public interface IFavouriteListRepository
    {
        Task<bool> RemoveByUsersIdAndRecipesId(Guid recipeId, string userId);
    }
}
