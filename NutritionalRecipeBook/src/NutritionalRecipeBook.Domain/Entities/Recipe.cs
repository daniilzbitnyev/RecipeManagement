using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace NutritionalRecipeBook.Domain.Entities
{
    public sealed class Recipe : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Calorie { get; set; }

        public Video? Video { get; set; }

        public Guid? RecipeCategoryId { get; set; }

        public RecipeCategory RecipeCategory { get; set; } 

        public int PreparationTimeInMinutes { get; set; }

        public int CookingTimeInMinutes { get; set; }

        public int ServingSize { get; set; }

        public Photo? Photo { get; set; }

        public int AvgRaiting { get; set; }

        public List<CookingStep> CookingSteps { get; set; } = new List<CookingStep>();

        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

        public List<Review> Reviews { get; set; } = new List<Review>();

        public List<ApplicationUser> Users { get; } = [];

        [NotMapped]
        public bool IsFavourite { get; set; }

        public string OwnerId { get; set; }
    }
}
