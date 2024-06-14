using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Infrastructure.Data
{
    public class ApplicationContext : IdentityDbContext
    {
        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<CookingStep> CookingSteps { get; set; }

        public DbSet<Ingredient> Ingridients { get; set; }

        public DbSet<MeasurementType> MeasurementTypes { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<RecipeCategory> RecipeCategories { get; set; }

        public DbSet<Video> Videos { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<FavouriteList> FavouriteLists { get; set; }

        public ApplicationContext()
        {
        }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>()
                .HasOne(v => v.Video)
                .WithOne()
                .HasForeignKey<Recipe>("VideoId");

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Comment)
                .WithOne(c => c.Review)
                .HasForeignKey<Review>(r => r.CommentId);

            modelBuilder.Entity<Recipe>()
               .HasOne(r => r.RecipeCategory)
               .WithMany(c => c.Recipes)
               .HasForeignKey(r => r.RecipeCategoryId);

            modelBuilder.Entity<Recipe>()
                .HasIndex(r => r.RecipeCategoryId)
                .IsUnique(false);

            modelBuilder.Entity<Recipe>()
                .HasOne(p => p.Photo)
                .WithOne()
                .HasForeignKey<Recipe>("PhotoId");

            modelBuilder.Entity<Recipe>()
                .HasMany(c => c.CookingSteps)
                .WithOne()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Recipe>()
                .HasMany(i => i.Ingredients)
                .WithOne();

            modelBuilder.Entity<Recipe>()
               .HasMany(i => i.Reviews)
               .WithOne();

            modelBuilder.Entity<CookingStep>()
               .HasMany(i => i.Photos)
               .WithOne();

            modelBuilder.Entity<Ingredient>()
               .HasOne(p => p.Product)
               .WithOne()
               .HasForeignKey<Ingredient>("ProductId")
               .IsRequired();

            modelBuilder.Entity<Ingredient>()
               .HasOne(m => m.Measurement)
               .WithOne()
               .HasForeignKey<Ingredient>("MeasurementTypeId");

            modelBuilder.Entity<MeasurementType>()
               .HasOne(r => r.Ingredient)
               .WithOne(r => r.Measurement)
               .HasForeignKey<Ingredient>(r => r.MeasurementTypeId);

            modelBuilder.Entity<Ingredient>()
                .HasIndex(r => r.MeasurementTypeId)
                .IsUnique(false);

            modelBuilder.Entity<Product>()
                .Property(n => n.Name).IsRequired();

            modelBuilder.Entity<Recipe>()
                .HasMany(e => e.Users)
                .WithMany(e => e.Recipes)
                .UsingEntity<FavouriteList>();

            modelBuilder.Entity<RecipeCategory>().HasData(
                    new RecipeCategory { Id = Guid.NewGuid(), Name = "Breakfast" },
                    new RecipeCategory { Id = Guid.NewGuid(), Name = "Lunch" },
                    new RecipeCategory { Id = Guid.NewGuid(), Name = "Dinner" },
                    new RecipeCategory { Id = Guid.NewGuid(), Name = "Snacks" },
                    new RecipeCategory { Id = Guid.NewGuid(), Name = "Desserts" }
                );

            modelBuilder.Entity<MeasurementType>().HasData(
                    new MeasurementType { Id = Guid.NewGuid(), Name = "g" },
                    new MeasurementType { Id = Guid.NewGuid(), Name = "kg" },
                    new MeasurementType { Id = Guid.NewGuid(), Name = "l" },
                    new MeasurementType { Id = Guid.NewGuid(), Name = "tsp" },
                    new MeasurementType { Id = Guid.NewGuid(), Name = "tbsp" }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
