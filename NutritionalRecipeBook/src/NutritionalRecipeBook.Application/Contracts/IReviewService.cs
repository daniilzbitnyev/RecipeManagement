using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IReviewService
    {
        Task<PagedList<Review>> GetMembersAsync(FilterParams filterParams);

        Task CreateAsync(Review review);
    }
}
