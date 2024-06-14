using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class FavouriteList : BaseEntity
    {
        public Guid RecipesId { get; set; }

        public string UsersId { get; set; }
    }
}
