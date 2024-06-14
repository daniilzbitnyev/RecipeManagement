using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class MeasurementType : BaseEntity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public Ingredient Ingredient { get; set; }
    }
}
