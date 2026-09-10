using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.ViewModels.Result
{
    public class RTaskManagerList
    {
        public ApiResult Result { get; set; }
        public List<TaskManagerVm> Data { get; set; }
    }
}
