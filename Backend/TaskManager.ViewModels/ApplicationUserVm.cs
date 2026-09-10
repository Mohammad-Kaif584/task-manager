using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.ViewModels
{
    public class ApplicationUserVm
    {
        public string Id { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression(@"[0-9]+$", ErrorMessage = "Mobile Number Should Digits only.")]
        public string? PhoneNumber { get; set; }
        [RegularExpression(@"[a-zA-Z-_ ]+$", ErrorMessage = "Invalid Name")]
        public string? UserName { get; set; }
        public string Password { get; set; }
        [Required]
        [RegularExpression(@"[a-zA-Z-_ ]+$", ErrorMessage = "Invalid Name")]
        public string FullName { get; set; }
        public string? Address { get; set; }
    }
}
