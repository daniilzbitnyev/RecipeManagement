using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IGenericRepository<Review> _repository;

        private readonly IReviewRepository _reviewRepository;

        public ReviewService(IGenericRepository<Review> repository, IReviewRepository reviewRepository)
        {
            _repository = repository;
            _reviewRepository = reviewRepository;   
        }

        public async Task<PagedList<Review>> GetMembersAsync(FilterParams filterParams)
        {
            return await _reviewRepository.GetMembersAsync(filterParams);
        }

        public async Task CreateAsync(Review review)
        {
            await _repository.AddAsync(review);
        }
    }
}
