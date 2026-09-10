using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Repository.Services;
using TaskManager.ViewModels;
using TaskManager.ViewModels.Enum;

namespace TaskManager.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TaskManagerController : ControllerBase
    {
        private ITaskManager taskManager;
        public TaskManagerController(ITaskManager _taskManager)
        {
            taskManager = _taskManager;
        }
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            return Ok(taskManager.GetAllTasks());
        }
        [HttpGet]
        public IActionResult GetByIsCompleted(EBool eBool)
        {
            return Ok(taskManager.GetByIsCompleted(eBool)); 
        }
        [HttpPost]
        public IActionResult AddTasks(TaskManagerVm taskManagerVm)
        {
            return Ok(taskManager.AddTasks(taskManagerVm));
        }
        [HttpPost]
        public IActionResult UpdateTasks(TaskManagerVm taskManagerVm)
        {
            return Ok(taskManager.UpdateTasks(taskManagerVm));
        }
        [HttpPost]
        public IActionResult DeleteTasks(int Id)
        {
            return Ok(taskManager.DeleteTasks(Id));
        }
    }
}
