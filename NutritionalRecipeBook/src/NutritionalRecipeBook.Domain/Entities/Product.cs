using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Product : BaseEntity
    {
        public string Name { get; set; }

        [NotMapped]
        public double? Calorie { get; set; }
    }
}
