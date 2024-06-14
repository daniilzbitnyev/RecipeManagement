using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<string> SaveFile(IFormFile imageFile, string folderName)
        {
            string originalFileName = Path.GetFileNameWithoutExtension(imageFile.FileName);
            string fileExtension = Path.GetExtension(imageFile.FileName);

            string fileName = originalFileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + Guid.NewGuid().ToString().Substring(0, 8) + fileExtension;

            var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, folderName, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return fileName;
        }

        public async Task<string> CreateFileSrc(string scheme, HostString host, string pathBase, string folder, string fileName)
        {
            return string.Format("{0}://{1}{2}/{3}/{4}", scheme, host, pathBase, folder, fileName);
        }

        public async Task<byte[]> SerializeJson(List<RecipeFile> existedRecipe)
        {
           var json = JsonSerializer.Serialize(existedRecipe);

           return Encoding.UTF8.GetBytes(json);
        }

        public async Task<List<RecipeRequest>> DeserializeFileToJson(ImportRequest importRequest)
        {
            using var stream = new StreamReader(importRequest.File.OpenReadStream());

            var fileContent = await stream.ReadToEndAsync();

            return JsonSerializer.Deserialize<List<RecipeRequest>>(fileContent);
        }
    }
}
