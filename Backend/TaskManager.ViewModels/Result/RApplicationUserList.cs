using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.ViewModels.Result
{
    public class RApplicationUserList
    {
        public ApiResult Result { get; set; }
        public List<ApplicationUserVm> Data { get; set; }
    }
}
