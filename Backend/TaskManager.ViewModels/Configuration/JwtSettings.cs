using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.ViewModels.Configuration
{
    public class JwtSettings
    {
        public string Key { get; set; }
        public string issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
        public int ExpireInMinutes { get; set; }
    }
}
