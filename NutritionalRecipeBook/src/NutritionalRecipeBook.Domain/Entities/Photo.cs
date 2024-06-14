using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Photo : BaseEntity
    {
        public string Title { get; set; }

        public string ImageName { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        public Guid CookingStepId { get; set; }
    }
}
