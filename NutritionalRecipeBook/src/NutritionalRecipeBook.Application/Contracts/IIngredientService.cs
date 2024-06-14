using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IIngredientService
    { 
        Task<Ingredient> GetByIdAsync(Guid ingredientId);

        Task CreateAsync(IngredientRequest ingredient);

        Task UpdateAsync(IngredientRequest ingredient);

        Task DeleteAsync(Guid id);
    }
}
