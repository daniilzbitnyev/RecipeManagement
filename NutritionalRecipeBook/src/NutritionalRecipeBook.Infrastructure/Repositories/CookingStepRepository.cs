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
    public class CookingStepRepository : ICookingStepRepository
    {
        private ApplicationContext _context;

        public CookingStepRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<CookingStep> GetByIdAsync(Guid id)
        {
            return await _context.CookingSteps
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task UpdateAsync(CookingStep cookingStep)
        {
            _context.CookingSteps.Attach(cookingStep);
            var entry = _context.Entry(cookingStep);

            entry.State = EntityState.Modified;

            entry.Property("RecipeId").IsModified = false;

            foreach (var photo in cookingStep.Photos)
            {
                _context.Entry(photo).State = EntityState.Modified;

                _context.Entry(photo).Property(p => p.CookingStepId).IsModified = false;
            }

            await _context.SaveChangesAsync();
        }
    }
}
