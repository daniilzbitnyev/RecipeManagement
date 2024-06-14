using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class RecipeCategory : BaseEntity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public List<Recipe>? Recipes { get; set; }
    }
}
