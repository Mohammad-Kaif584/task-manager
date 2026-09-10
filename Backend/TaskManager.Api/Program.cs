using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.shared;
using TaskManager.Models;
using TaskManager.Repository;
using TaskManager.Repository.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});
IConfiguration configuration = builder.Configuration;

builder.Services.AddDbContextPool<ApplicationDbContext>(x =>
{
    x.UseMySQL(configuration.GetConnectionString("DefaultConnection"),
        e => e.MigrationsAssembly("TaskManager.Api"));
});
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();


InitialSettings.JwtAuth(builder);

builder.Services.AddScoped<ITaskManager, TaskManagerRepository>();
builder.Services.AddScoped<IApplicationUser, ApplicationUserRepository>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
