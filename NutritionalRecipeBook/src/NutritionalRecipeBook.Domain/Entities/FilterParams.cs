using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class FilterParams
    {
        private const int MaxPageSize = 50;
        
        private int _pageSize = 10;

        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string? Category { get; set; }

        public string? Search { get; set; }

        public string? RecipeId { get; set; }

        public string? UserId { get; set; }

        public double? MinCalorie { get; set; } = 0;

        public double? MaxCalorie { get; set; } 
    }
}
