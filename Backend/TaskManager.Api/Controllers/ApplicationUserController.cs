using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.Repository.Services;
using TaskManager.ViewModel;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Result;

namespace TaskManager.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private IApplicationUser repo;
        public ApplicationUserController(IApplicationUser _repo)
        {
            repo = _repo;
        }
        [HttpPost]
        public async Task<IActionResult> Token(AuthUserVM userVM)
        {
            var res = await repo.Token(userVM);
            return Ok(res);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await repo.GetAll();
            return Ok(res);
        }
        [HttpPost]
        public async Task<IActionResult> Add(ApplicationUserVm user)
        {
            var res = await repo.Add(user);
            return Ok(res);
        }
        [HttpPost]
        public async Task<IActionResult> Update(ApplicationUserVm user)
        {
            var res = await repo.Update(user);
            return Ok(res);
        }
        [HttpPost]
        public IActionResult Delete(string Id)
        {
            return Ok(repo.Delete(Id));
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordVm model)
        {
            try
            {
                var result = await repo.ChangePassword(model);

                if (result)
                    return Ok("Password changed successfully");
                else
                    return BadRequest("Failed to change password");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
