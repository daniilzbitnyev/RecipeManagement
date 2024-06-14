using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Application.DTOs.Shared;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class CookingStepConvertor
    {
        public static CookingStep ConvertToDto(this CookingStepRequest cookingStepRequest)
        {
            List<Photo> photos = new List<Photo>();
            foreach (var item in cookingStepRequest.Photos)
                photos.Add(item?.ConvertToPhoto());

            var entity = new CookingStep()
            {
                NumberStep = cookingStepRequest.NumberStep,
                Title = cookingStepRequest.Title,
                Description = cookingStepRequest.Description,
                Photos = photos,
                RecipeId = new Guid(cookingStepRequest.RecipeId),
            };

            if (cookingStepRequest.Id != null)
            {
                entity.Id = cookingStepRequest.Id;
            }

            return entity;
        }

        public static CookingStepFile ConvertToExportFile(this CookingStep cookingStep)
        {
            var entity = new CookingStepFile()
            {
                NumberStep = cookingStep.NumberStep,
                Title = cookingStep.Title,
                Description = cookingStep.Description,
            };

            return entity;
        }
    }
}
