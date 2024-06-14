using NLog;
using NutritionalRecipeBook.Application.DTOs;
using System.Net;

namespace NutritionalRecipeBook.Api.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        private readonly RequestDelegate _next;

        public GlobalExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.Error(exception, "An unexpected error occurred.");

            ExceptionResponse response = exception switch
            {
                UnauthorizedAccessException _ => new ExceptionResponse(HttpStatusCode.Unauthorized, "The user is unathorized."),
                ApplicationException _ => new ExceptionResponse(HttpStatusCode.BadRequest, "Application exception occurred."),
                KeyNotFoundException _ => new ExceptionResponse(HttpStatusCode.NotFound, "The request key not found."),
                _ => new ExceptionResponse(HttpStatusCode.InternalServerError, "Internal server error. Please retry later.")
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)response.StatusCode;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
