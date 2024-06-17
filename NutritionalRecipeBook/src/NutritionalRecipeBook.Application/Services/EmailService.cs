using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Domain.Entities;
using System.Net;
using System.Net.Mail;

namespace NutritionalRecipeBook.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        private readonly UserManager<ApplicationUser> _userManager;

        public EmailService(IConfiguration config, UserManager<ApplicationUser> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public Task SendEmailAsync(string toEmail, string subject, string body, bool isBodyHtml)
        {
            string MailServer = _config["EmailSettings:MailServer"];
            string FromEmail = _config["EmailSettings:FromEmail"];
            string Password = _config["EmailSettings:Password"];
            int Port = int.Parse(_config["EmailSettings:MailPort"]);

            var client = new SmtpClient(MailServer, Port)
            {
                Credentials = new NetworkCredential(FromEmail, Password),
                EnableSsl = true
            };

            MailMessage mailMessage = new MailMessage(FromEmail, toEmail, subject, body)
            {
                IsBodyHtml = isBodyHtml
            };

            return client.SendMailAsync(mailMessage);
        }

        public async Task SendConfirmationEmail(string? email, ApplicationUser? user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = $"https://nutritionalrecipebookapi20240615231122.azurewebsites.net/api/auth/confirm-email?userId={user.Id}&token={token}";
            await SendEmailAsync(email, "Confirm Your Email", $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>;.", true);
        }
    }
}
