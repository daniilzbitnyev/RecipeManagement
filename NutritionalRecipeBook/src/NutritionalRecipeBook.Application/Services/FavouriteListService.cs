using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Domain.Entities;
using NutritionalRecipeBook.Infrastructure.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Services
{
    public class FavouriteListService : IFavouriteListService
    {
        private readonly IGenericRepository<FavouriteList> _repository;

        private readonly IFavouriteListRepository _favouriteListRepository;

        public FavouriteListService(IGenericRepository<FavouriteList> repository, IFavouriteListRepository favouriteListRepository)
        {
            _repository = repository;   
            _favouriteListRepository = favouriteListRepository;
        }

        public async Task CreateAsync(FavouriteListRequest favouriteList)
        {
            await _repository.AddAsync(favouriteList.ConvertTo());
        }

        public async Task<bool> RemoveByUsersIdAndRecipesId(Guid recipeId, string userId)
        {
            return await _favouriteListRepository.RemoveByUsersIdAndRecipesId(recipeId, userId);
        }
    }
}
