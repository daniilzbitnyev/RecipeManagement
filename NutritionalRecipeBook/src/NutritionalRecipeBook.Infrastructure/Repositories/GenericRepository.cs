using Microsoft.EntityFrameworkCore;
using NLog;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private ApplicationContext _context;

        private DbSet<T> _table;

        public GenericRepository()
        {
            _table = _context.Set<T>();
        }

        public GenericRepository(ApplicationContext context)
        {
            _context = context;
            _table = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _table.ToListAsync();
        }

        public async Task<PagedList<T>> GetMembersAsync(FilterParams recipeParams)
        {
            var query = _table.AsQueryable();

            return await PagedList<T>.CreateAsync(query, recipeParams.PageNumber, recipeParams.PageSize);
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _table.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddAsync(T sender)
        {
            await _table.AddAsync(sender);
            _context.Entry(sender).State = EntityState.Added;
            await SaveAsync();
        }

        public async Task UpdateAsync(T sender)
        {
            _table.Attach(sender);
            _context.Entry(sender).State = EntityState.Modified;
            await SaveAsync();
        }

        public async Task<bool> RemoveAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);

            if (entity != null)
            {
                _table.Remove(entity);
                await SaveAsync();
                return true;
            }

            return false;
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
