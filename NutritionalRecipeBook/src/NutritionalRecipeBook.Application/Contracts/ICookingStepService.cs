using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface ICookingStepService
    {
        Task<CookingStep> GetByIdAsync(Guid cookingStepId);

        Task CreateAsync(CookingStepRequest cookingStep);

        Task UpdateAsync(CookingStepRequest cookingStep);

        Task DeleteAsync(Guid id);
    }
}
