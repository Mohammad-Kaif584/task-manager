using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.ViewModels.Enum;

namespace TaskManager.ViewModels.Result
{
    public class ApiResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
