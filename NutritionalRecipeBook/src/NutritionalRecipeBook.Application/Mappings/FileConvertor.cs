using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Application.Mappings
{
    public static class FileConvertor
    {
        public static Photo ConvertToPhoto(this PhotoRequest photoRequest)
        {
            Photo photo = new()
            {
                Title = photoRequest.Title,
                ImageName = photoRequest.ImageName,
            };

            if (photoRequest.Id != null)
            {
                photo.Id = photoRequest.Id;
            }

            return photo;
        }

        public static Video ConvertToVideo(this VideoRequest videoRequest)
        {
            Video photo = new()
            {
                Title = videoRequest.Title,
                VideoName = videoRequest.VideoName,
            };

            if (videoRequest.Id != null)
            {
                photo.Id = videoRequest.Id;
            }

            return photo;
        }
    }
}
