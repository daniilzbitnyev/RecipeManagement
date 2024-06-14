using Microsoft.AspNetCore.Http;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IFileService
    {
        Task<string> SaveFile(IFormFile imageFile, string folderName);

        Task<string> CreateFileSrc(string scheme, HostString host, string pathBase, string folder, string fileName);

        Task<byte[]> SerializeJson(List<RecipeFile> existedRecipe);

        Task<List<RecipeRequest>> DeserializeFileToJson(ImportRequest importRequest);
    }
}
