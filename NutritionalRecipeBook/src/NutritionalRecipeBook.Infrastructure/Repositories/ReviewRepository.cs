using Microsoft.EntityFrameworkCore;
using NutritionalRecipeBook.Application.DTOs.Requests;
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
    public class ReviewRepository : IReviewRepository
    {
        private ApplicationContext _context;

        public ReviewRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Review>> GetMembersAsync(FilterParams recipeParams)
        {
            var query = _context.Reviews.Where(r => r.RecipeId == new Guid(recipeParams.RecipeId))
                                        .Include(c => c.Comment);
           
            var resultList = await query.ToListAsync();

            resultList.Reverse();

            var pageNumber = recipeParams.PageNumber;
            var pageSize = recipeParams.PageSize;
            var totalCount = resultList.Count;
            var pagedItems = resultList.Skip((pageNumber) * pageSize).Take(pageSize).ToList();

            return new PagedList<Review>(pagedItems, totalCount, pageNumber, pageSize);
        }
    }
}
