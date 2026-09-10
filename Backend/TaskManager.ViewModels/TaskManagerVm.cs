using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.ViewModels.Enum;

namespace TaskManager.ViewModels
{
    public class TaskManagerVm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public EBool IsCompleted { get; set; }
    }
}
