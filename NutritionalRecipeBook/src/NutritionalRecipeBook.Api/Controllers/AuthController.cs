using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Application.DTOs.Requests;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IEmailService _emailService;

        private readonly IAuthService _authService;

        public AuthController(UserManager<ApplicationUser> userManager,
            IEmailService emailService,
            SignInManager<ApplicationUser> signInManager,
            IAuthService authService)
        {
            _userManager = userManager;
            _emailService = emailService;
            _signInManager = signInManager;
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("sign-up")]
        public async Task<IActionResult> Register(UserRegistrationRequest userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userExist = await _userManager.FindByEmailAsync(userModel.Email);

            if (userExist is not null)
            {
                return BadRequest(new { message = "User already exist" });
            }

            var user = new ApplicationUser
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { errors });
            }

            await _emailService.SendConfirmationEmail(user.Email, user);

            return Ok(new { message = "Please verify your email." });
        }

        [HttpGet]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (userId == null || token == null)
            {
                return StatusCode(StatusCodes.Status410Gone, new { message = "Link expired" });
            }
            else if (user == null)
            {
                return NotFound(new { message = "User not Found" });
            }
            else
            {
                token = token.Replace(" ", "+");
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Thank you for confirming your email" });
                }
                else
                {
                    return BadRequest(new { message = "Email not confirmed" });
                }
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("sign-in")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new ApplicationUser();

            user = await _userManager.FindByEmailAsync(loginRequest.UserNameOrEmail);
            
            if (user == null)
            {
                user = await _userManager.FindByNameAsync(loginRequest.UserNameOrEmail);
            }

            if (user == null)
            {
                 return Unauthorized();
            }

            if (user.EmailConfirmed.Equals(false))
            {
                return Unauthorized(new { message = "Please verify your email." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var token = _authService.GenerateAccessToken(user);

            return Ok(new { Id = user.Id, Token = token });
        }
    }
}
