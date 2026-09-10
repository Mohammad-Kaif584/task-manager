using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [Column(TypeName = "NVARCHAR(30)")]
        [RegularExpression(@"[a-zA-Z-_ ]+$", ErrorMessage = "Invalid Name")]
        public string FullName { get; set; }
        [Column(TypeName = "VARCHAR(500)")]
        public string Address { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

    }
}
