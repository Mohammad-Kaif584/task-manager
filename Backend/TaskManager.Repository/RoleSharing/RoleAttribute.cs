using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Repository.RoleSharing
{
    public enum UserRoleName
    {
        Administrator = 101,
        Opration = 102
    }
    public class Role
    {
        public const string Admin = "Administrator";
        public const string Opration = "Opration";
    }
    public class AuthroisRoleAttribute : AuthorizeAttribute

    {
        public AuthroisRoleAttribute(params string[] roles) : base()
        {
            Roles = string.Join(",", roles);
        }
    }
}
