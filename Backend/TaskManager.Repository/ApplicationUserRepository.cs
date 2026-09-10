using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Models;
using TaskManager.Repository.RoleSharing;
using TaskManager.Repository.Services;
using TaskManager.ViewModel;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Configuration;
using TaskManager.ViewModels.Result;

namespace TaskManager.Repository
{
    public class ApplicationUserRepository : IApplicationUser
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private JwtSettings jwtSettings;

        public ApplicationUserRepository(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
           IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _userManager = userManager;
            this.jwtSettings = jwtSettings.Value;
        }
        public async Task<string> Token(AuthUserVM user)
        {
            var goal = await _userManager.FindByNameAsync(user.UserName);

            if (goal != null)
            {
                var thispass = await _userManager.CheckPasswordAsync(goal, user.Password);
                if (thispass)
                {

                    var key = Encoding.ASCII.GetBytes(jwtSettings.Key);
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        Issuer = jwtSettings.issuer,
                        Audience = jwtSettings.Audience,
                        Expires = DateTime.Now.AddMinutes(jwtSettings.ExpireInMinutes),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256),
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(JwtRegisteredClaimNames.Sub, jwtSettings.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
                    new Claim("id",goal.Id),
                    new Claim("username",goal.UserName),
                    new Claim("fullname",goal.FullName),
                        })
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokeninit = tokenHandler.CreateToken(tokenDesc);
                    string token = tokenHandler.WriteToken(tokeninit);
                    return token;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
        public async Task<List<ApplicationUserVm>> GetAll()
        {
            var lst = await _context.ApplicationUsers
                .OrderBy(x => x.CreatedDate) 
                .Select(user => new ApplicationUserVm
                {
                    Id = user.Id,
                    Address = user.Address,
                    Email = user.Email,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    UserName = user.UserName,
                })
                .ToListAsync();

            return lst;
        }
        public async Task<bool> Add(ApplicationUserVm user)
        {
            ApplicationUser dbstu = new ApplicationUser
            {
                Address = user.Address,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName,
            };
            var res = await _userManager.CreateAsync(dbstu, user.Password);
            return res.Succeeded;
        }
        public async Task<bool> Update(ApplicationUserVm user)
        {
            var existingUser = await _userManager.FindByIdAsync(user.Id);
            if (existingUser == null)

            existingUser.Email = user.Email;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.FullName = user.FullName;
            existingUser.Address = user.Address;
            existingUser.UserName = user.UserName;

            var updateResult = await _userManager.UpdateAsync(existingUser);
            if (!updateResult.Succeeded)

            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(existingUser);
                var passwordResult = await _userManager.ResetPasswordAsync(existingUser, token, user.Password);
                if (!passwordResult.Succeeded) return false;
            }

            return true;
        }

        public ApiResult Delete(string Id)
        {
            ApiResult response = new ApiResult();
            try
            {
                var res = _context.ApplicationUsers.FirstOrDefault(x => x.Id == Id);
                _context.ApplicationUsers.Remove(res);
                int a = _context.SaveChanges();
                response = new ApiResult { Success = true, Message = "Deleted Successfully" };
            }
            catch (Exception ex)
            {
                response = new ApiResult { Success = false, Message = ex.Message };
            }
            return response;
        }
        public async Task<bool> ChangePassword(ChangePasswordVm model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
                return false;

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            return result.Succeeded;
        }
    }
}
