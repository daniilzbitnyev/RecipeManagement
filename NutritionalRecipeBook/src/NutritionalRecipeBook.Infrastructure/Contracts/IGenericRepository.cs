using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Contracts
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();

        Task<PagedList<T>> GetMembersAsync(FilterParams recipeParams);

        Task<T> GetByIdAsync(Guid id);

        Task AddAsync(T sender);

        Task UpdateAsync(T sender);

        Task<bool> RemoveAsync(Guid id);

        Task<int> SaveAsync();
    }
}
