using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Contracts
{
    public interface ICookingStepRepository
    {
        Task<CookingStep> GetByIdAsync(Guid id);

        Task UpdateAsync(CookingStep cookingStep);
    }
}
