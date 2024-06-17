using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.Mappings;
using NutritionalRecipeBook.Application.Services;
using NutritionalRecipeBook.Infrastructure.Contracts;
using NutritionalRecipeBook.Infrastructure.Repositories;

namespace NutritionalRecipeBook.Api.Configurations
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddServices(this WebApplicationBuilder builder, IConfiguration config)
        {
            var services = builder.Services;

            services.AddTransient<IRecipeService, RecipeService>();
            services.AddTransient<IRecipeCategoryService, RecipeCategoryService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IIngredientService, IngredientService>();
            services.AddTransient<ICookingStepService, CookingStepService>();
            services.AddTransient<IMeasurementTypeService, MeasurementTypeService>();
            services.AddTransient<IReviewService, ReviewService>();
            services.AddTransient<INutritionService, NutritionService>();
            services.AddTransient<IFavouriteListService, FavouriteListService>();

            services.AddHttpClient();

            services.AddTransient<IRecipeRepository, RecipeRepository>();
            services.AddTransient<IIngredientRepository, IngredientRepository>();
            services.AddTransient<ICookingStepRepository, CookingStepRepository>();
            services.AddTransient<IReviewRepository, ReviewRepository>();
            services.AddTransient<IFavouriteListRepository, FavouriteListRepository>();

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }
    }
}