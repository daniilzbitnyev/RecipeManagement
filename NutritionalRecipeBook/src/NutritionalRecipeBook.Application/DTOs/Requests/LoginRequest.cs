using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username or email is required.")]
        public string? UserNameOrEmail { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }    
    }
}
