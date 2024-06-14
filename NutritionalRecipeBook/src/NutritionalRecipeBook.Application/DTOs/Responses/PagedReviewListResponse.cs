using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.DTOs.Responses
{
     public record PagedReviewListResponse(PagedList<Review> Reviews, int TotalPages, int totalCount);
}
