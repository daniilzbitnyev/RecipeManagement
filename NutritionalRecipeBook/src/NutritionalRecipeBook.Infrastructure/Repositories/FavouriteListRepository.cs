using Microsoft.EntityFrameworkCore;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Repositories
{
    public class FavouriteListRepository : IFavouriteListRepository
    {
        private ApplicationContext _context;

        public FavouriteListRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<bool> RemoveByUsersIdAndRecipesId(Guid recipeId, string userId)
        {
            var entity = await _context.FavouriteLists.FirstOrDefaultAsync(fl => fl.RecipesId == recipeId && fl.UsersId == userId);

            if (entity != null)
            {
                _context.FavouriteLists.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
