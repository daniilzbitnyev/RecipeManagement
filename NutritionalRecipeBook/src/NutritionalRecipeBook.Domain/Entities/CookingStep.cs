using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class CookingStep : BaseEntity
    {
        public int NumberStep { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Guid RecipeId { get; set; } 

        public List<Photo> Photos { get; set; } = new List<Photo>();
    }
}
