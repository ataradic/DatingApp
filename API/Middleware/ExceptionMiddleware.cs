using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Error;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly ILogger<ExceptionMiddleware> _looger;
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> looger, IHostEnvironment env)
        {
            _env = env;
            _next = next;
            _looger = looger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                 await _next(context);
            }
            catch (Exception ex)
            {
                _looger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new ApiException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(context.Response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}