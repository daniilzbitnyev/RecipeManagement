using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Comment : BaseEntity
    {
        public string Text { get; set; }

        [JsonIgnore]
        public Review Review { get; set; } 
    }
}
