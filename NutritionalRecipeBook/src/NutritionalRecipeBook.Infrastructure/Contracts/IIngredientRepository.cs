using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Contracts
{
    public interface IIngredientRepository
    {
        Task<Ingredient> GetByIdAsync(Guid id);

        Task AddAsync(Ingredient ingredient);

        Task UpdateAsync(Ingredient ingredient);
    }
}
