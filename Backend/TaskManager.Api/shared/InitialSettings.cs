using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManager.ViewModels.Configuration;

namespace TaskManager.Api.shared
{
    public class InitialSettings
    {
        public static void JwtAuth(WebApplicationBuilder builder)
        {
            IConfiguration configuration = builder.Configuration;

            var jwtsettings = configuration.GetSection("Jwt");
            builder.Services.Configure<JwtSettings>(jwtsettings);

            var authSettings = jwtsettings.Get<JwtSettings>();
            var key = Encoding.ASCII.GetBytes(authSettings.Key);
            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = authSettings.issuer,
                    ValidAudience = authSettings.Audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                };
            });
        }
    }
}
