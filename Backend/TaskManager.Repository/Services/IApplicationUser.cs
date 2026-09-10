using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.ViewModel;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Result;

namespace TaskManager.Repository.Services
{
    public interface IApplicationUser
    {
        public Task<string> Token(AuthUserVM user);
        public Task<List<ApplicationUserVm>> GetAll();
        public Task<bool> Add(ApplicationUserVm user);
        public Task<bool> Update(ApplicationUserVm user);
        public ApiResult Delete(string Id);
        public Task<bool> ChangePassword(ChangePasswordVm model);
    }
}
