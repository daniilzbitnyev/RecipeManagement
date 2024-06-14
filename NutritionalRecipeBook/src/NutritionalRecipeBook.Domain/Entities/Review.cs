using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Review : BaseEntity
    {
        public int Rate { get; set; }

        [JsonIgnore]
        public Guid CommentId { get; set; }

        public Comment? Comment { get; set; }

        public Guid RecipeId { get; set; }

        public string OwnerUserName { get; set; }

        public string OwnerId { get; set; }
    }
}
