using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Ingredient : BaseEntity
    {
        public float Quantity { get; set; }

        public Product? Product { get; set; }

        public Guid? MeasurementTypeId { get; set; }

        public MeasurementType? Measurement { get; set; }

        public Guid? RecipeId { get; set; }
    }
}
