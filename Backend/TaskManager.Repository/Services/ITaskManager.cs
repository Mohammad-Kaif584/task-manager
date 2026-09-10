using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Models;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Enum;
using TaskManager.ViewModels.Result;

namespace TaskManager.Repository.Services
{
    public interface ITaskManager
    {
        public IEnumerable<TaskManagerVm> GetAllTasks();
        public RTaskManagerList GetByIsCompleted(EBool eBool);
        public RTaskManager AddTasks(TaskManagerVm param);
        public ApiResult UpdateTasks(TaskManagerVm param);
        public ApiResult DeleteTasks(int Id);
    }
}
