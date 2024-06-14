using Microsoft.EntityFrameworkCore;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private ApplicationContext _context;

        public IngredientRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Ingredient> GetByIdAsync(Guid id)
        {
            return await _context.Ingridients
                .Include(p => p.Product)
                .Include(m => m.Measurement)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task AddAsync(Ingredient ingredient)
        {
            if (string.IsNullOrEmpty(ingredient.Measurement.Name))
            {
                ingredient.MeasurementTypeId = null;
                ingredient.Measurement = null;
            }

            if (ingredient.Measurement is not null)
            {
                var existingMeasurementType = await _context.MeasurementTypes.FirstOrDefaultAsync(r => r.Name == ingredient.Measurement.Name);

                if (existingMeasurementType != null)
                {
                    ingredient.MeasurementTypeId = existingMeasurementType.Id;
                    ingredient.Measurement = existingMeasurementType;
                }
            }

            await _context.Ingridients.AddAsync(ingredient);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(Ingredient ingredient)
        {
            _context.Ingridients.Attach(ingredient);
            var entry = _context.Entry(ingredient);

            entry.State = EntityState.Modified;

            entry.Property("RecipeId").IsModified = false;
            await _context.SaveChangesAsync();
        }
    }
}
