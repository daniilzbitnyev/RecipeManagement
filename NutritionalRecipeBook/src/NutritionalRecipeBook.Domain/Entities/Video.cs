using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Video : BaseEntity
    {
        public string Title { get; set; }

        public string VideoName { get; set; }

        [NotMapped]
        public string VideoSrc { get; set; }
    }
}
