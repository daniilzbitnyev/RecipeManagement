using NLog.Web;

namespace NutritionalRecipeBook.Api.Configurations
{
    public static class ConfigureLogging
    {
        public static WebApplicationBuilder AddApplicationLogging(this WebApplicationBuilder builder, IConfiguration config)
        {
            var services = builder.Services;

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.ClearProviders();
                loggingBuilder.AddNLogWeb();
            });

            return builder;
        }
    }
}
