using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class FavouriteListRequest
    {
        public string RecipesId { get; set; }

        public string UsersId { get; set; }
    }
}
