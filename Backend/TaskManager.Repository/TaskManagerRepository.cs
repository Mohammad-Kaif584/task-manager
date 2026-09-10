using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Models;
using TaskManager.Repository.Services;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Enum;
using TaskManager.ViewModels.Result;

namespace TaskManager.Repository
{
    public class TaskManagerRepository : ITaskManager
    {
        private ApplicationDbContext _context;
        public TaskManagerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<TaskManagerVm> GetAllTasks()
        {
            var lst = _context.TaskManagers.ToList();
            List<TaskManagerVm> taskManagers = new List<TaskManagerVm>();

            foreach (var item in lst)
            {
                {
                    taskManagers.Add(new TaskManagerVm
                    {
                        Id = item.Id,
                        Description = item.Description,
                        IsCompleted = item.IsCompleted,
                        Title = item.Title,
                    });
                }
            }
            return taskManagers;
        }
        public RTaskManagerList GetByIsCompleted(EBool eBool)
        {
            RTaskManagerList response = new RTaskManagerList();
            try
            {
                var task = _context.TaskManagers.Where(e => e.IsCompleted == eBool).ToList();
                List<TaskManagerVm> data = new List<TaskManagerVm>();
                foreach (var vm in task)
                {
                    data.Add(new TaskManagerVm
                    {
                        Id = vm.Id,
                        Title = vm.Title,
                        Description = vm.Description,
                        IsCompleted = vm.IsCompleted,
                    });
                }
                response.Data = data;
                response.Result = new ApiResult { Success = true, Message = "Succeeded" };
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Result = new ApiResult { Success = false, Message = "Not Found" };
            }
            return response;

        }
        public RTaskManager AddTasks(TaskManagerVm param)
        {
            RTaskManager response = new RTaskManager();
            try
            {
                TaskManagers taskManagerm = new TaskManagers
                {
                    Description = param.Description,
                    IsCompleted = param.IsCompleted,
                    Title = param.Title,
                };
                _context.TaskManagers.Add(taskManagerm);
                var a = _context.SaveChanges();
                response.Data = param;
                response.Result = new ApiResult { Success = true, Message = "Succeeded" };
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Result = new ApiResult { Success = false, Message = "Not Found" };
            }
            return response;
        }
        public ApiResult UpdateTasks(TaskManagerVm param)
        {
            ApiResult response = new ApiResult();
            try
            {
                TaskManagers taskManagerm = new TaskManagers
                {
                    Id = param.Id,
                    Description = param.Description,
                    IsCompleted = param.IsCompleted,
                    Title = param.Title,
                };
                _context.TaskManagers.Update(taskManagerm);
                int a = _context.SaveChanges();
                response = new ApiResult { Success = true, Message = "Updated Successfully" };
            }
            catch (Exception ex)
            {
                response = new ApiResult { Success = false, Message = ex.Message };
            }
            return response;
        }
        public ApiResult DeleteTasks(int Id)
        {
            ApiResult response = new ApiResult();
            try
            {
                var res = _context.TaskManagers.FirstOrDefault(x => x.Id == Id);
            _context.TaskManagers.Remove(res);
            int a = _context.SaveChanges();
            response = new ApiResult { Success = true, Message = "Deleted Successfully" };
            }
            catch (Exception ex)
            {
                response = new ApiResult { Success = false, Message = ex.Message };
            }
            return response;
        }

    }
}
