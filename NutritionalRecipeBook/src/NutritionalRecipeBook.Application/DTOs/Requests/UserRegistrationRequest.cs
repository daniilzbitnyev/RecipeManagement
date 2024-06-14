using System.ComponentModel.DataAnnotations;

namespace NutritionalRecipeBook.Application.DTOs.Requests
{
    public class UserRegistrationRequest
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(100, ErrorMessage = "The username should be less than 100 characters")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
