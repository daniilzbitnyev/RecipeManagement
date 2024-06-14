using Microsoft.EntityFrameworkCore;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Data;

namespace NutritionalRecipeBook.Infrastructure.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private ApplicationContext _context;

        public RecipeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Recipe>> GetRecipes(FilterParams recipeParams)
        {
            var source = BuildRecipeQuery();
            string search = recipeParams.Search;
            string category = recipeParams.Category;

            if (!string.IsNullOrEmpty(recipeParams.UserId))
            {
                source = from r in _context.Recipes
                                    join fl in _context.FavouriteLists on r.Id equals fl.RecipesId
                                    where fl.UsersId == recipeParams.UserId
                                    select r;
            }
            if (!string.IsNullOrEmpty(search))
            {
                source = source.Where(r => r.Title.Trim().StartsWith(search.Trim())
                                                       || r.Ingredients.Any(i => i.Product.Name.Trim().StartsWith(search.Trim())));
            }
            if (!string.IsNullOrEmpty(category))
            {
                source = source.Where(r => r.RecipeCategory.Name == category);
            }

            if (recipeParams.MaxCalorie is not null && recipeParams.MaxCalorie > 0)
            {
                source = source.Where(r => r.Calorie >= recipeParams.MinCalorie
                                            && r.Calorie <= recipeParams.MaxCalorie);
            }
            else if (recipeParams.MinCalorie is not null && recipeParams.MaxCalorie == 0)
            {
                source = source.Where(r => r.Calorie >= recipeParams.MinCalorie
                                            && r.Calorie <= double.MaxValue);
            }

            return await PagedList<Recipe>.CreateAsync(source, recipeParams.PageNumber, recipeParams.PageSize);
        }

        public async Task<Recipe> GetById(Guid id, string? userId)
        {
            var entity = await _context.Recipes
            .Include(p => p.Photo)
            .Include(v => v.Video)
            .Include(r => r.RecipeCategory)
            .Include(c => c.CookingSteps)
            .ThenInclude(cs => cs.Photos)
            .Include(i => i.Ingredients)
                    .ThenInclude(i => i.Product)
                .Include(i => i.Ingredients)
                    .ThenInclude(i => i.Measurement)
                .Include(r => r.Reviews)
                    .ThenInclude(c => c.Comment)
                    .FirstOrDefaultAsync(r => r.Id == id);

            if (!string.IsNullOrEmpty(userId))
            {
                entity.IsFavourite = _context.FavouriteLists.Any(fr => fr.RecipesId == entity.Id && fr.UsersId == userId);
            }

            return entity;
        }
        public async Task AddAsync(Recipe recipe)
        {
            var existingRecipeCategory = await _context.RecipeCategories.FirstOrDefaultAsync(r => r.Name == recipe.RecipeCategory.Name);

            if (existingRecipeCategory != null)
            {
                recipe.RecipeCategoryId = existingRecipeCategory.Id;
                recipe.RecipeCategory = existingRecipeCategory;
            }

            if (recipe.Ingredients is not null)
            {
                foreach (var ingredient in recipe.Ingredients)
                {
                    if (ingredient.Measurement is null)
                    {
                        ingredient.MeasurementTypeId = null;
                        ingredient.Measurement = null;
                    }
                    else
                    {
                        var existingMeasurementType = await _context.MeasurementTypes.FirstOrDefaultAsync(r => r.Name == ingredient.Measurement.Name);

                        if (existingMeasurementType != null)
                        {
                            ingredient.MeasurementTypeId = existingMeasurementType.Id;
                            ingredient.Measurement = existingMeasurementType;
                        }
                    }
                }
            }

            await _context.Recipes.AddAsync(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task AddRangeAsync(List<Recipe> recipes)
        {
            foreach (var recipe in recipes)
            {

                var existingRecipeCategory = await _context.RecipeCategories.FirstOrDefaultAsync(r => r.Name == recipe.RecipeCategory.Name);

                if (existingRecipeCategory != null)
                {
                    recipe.RecipeCategoryId = existingRecipeCategory.Id;
                    recipe.RecipeCategory = existingRecipeCategory;
                }

                if (recipe.Ingredients is not null)
                {
                    foreach (var ingredient in recipe.Ingredients)
                    {
                        if (ingredient.Measurement is null)
                        {
                            ingredient.MeasurementTypeId = null;
                            ingredient.Measurement = null;
                        }
                        else
                        {
                            var existingMeasurementType = await _context.MeasurementTypes.FirstOrDefaultAsync(r => r.Name == ingredient.Measurement.Name);

                            if (existingMeasurementType != null)
                            {
                                ingredient.MeasurementTypeId = existingMeasurementType.Id;
                                ingredient.Measurement = existingMeasurementType;
                            }
                        }
                    }
                }
            }

            await _context.Recipes.AddRangeAsync(recipes);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Recipe recipe)
        {
            var entity = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipe.Id);

            if (entity is not null)
            {
                var existingRecipeCategory = new RecipeCategory();

                if (recipe.RecipeCategory.Name == entity.RecipeCategory.Name)
                {
                    existingRecipeCategory = await _context.RecipeCategories.FirstOrDefaultAsync(r => r.Name == entity.RecipeCategory.Name);
                }
                else
                {
                    existingRecipeCategory = await _context.RecipeCategories.FirstOrDefaultAsync(r => r.Name == recipe.RecipeCategory.Name);
                }

                if (existingRecipeCategory != null)
                {
                    entity.RecipeCategoryId = existingRecipeCategory.Id;
                    entity.RecipeCategory = existingRecipeCategory;
                }

                entity.Title = recipe.Title;
                entity.Description = recipe.Description;
                entity.ServingSize = recipe.ServingSize;
                entity.CookingTimeInMinutes = recipe.CookingTimeInMinutes;
                entity.PreparationTimeInMinutes = recipe.PreparationTimeInMinutes;
                entity.Video = recipe.Video;
                entity.Photo = recipe.Photo;
                entity.CookingSteps = entity.CookingSteps;
                entity.Ingredients = entity.Ingredients;

                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateCalorie(double calorie, Guid recipeId)
        {
            var entity = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipeId);

            entity.Calorie = calorie / entity.ServingSize;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAvgRaiting(Guid recipeId)
        {
            var entity = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipeId);
            var ratingAvg = (int)await _context.Reviews.Where(r => r.RecipeId == recipeId).AverageAsync(r => r.Rate);

            entity.AvgRaiting = ratingAvg;

            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await GetById(id, null);

            if (entity != null)
            {
                var cookingSteps = _context.CookingSteps.Where(cs => cs.RecipeId == entity.Id).ToList();
                _context.CookingSteps.RemoveRange(cookingSteps);
                await _context.SaveChangesAsync();
                _context.Recipes.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        private IQueryable<Recipe> BuildRecipeQuery()
        {
            return _context.Recipes
            .Include(p => p.Photo)
            .Include(v => v.Video)
            .Include(r => r.RecipeCategory)
            .Include(c => c.CookingSteps)
            .ThenInclude(cs => cs.Photos)
            .Include(i => i.Ingredients)
                    .ThenInclude(i => i.Product)
                .Include(i => i.Ingredients)
                    .ThenInclude(i => i.Measurement)
                .Include(r => r.Reviews)
                    .ThenInclude(c => c.Comment)
                    .AsQueryable();
        }
    }
}
