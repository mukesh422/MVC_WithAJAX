using Microsoft.EntityFrameworkCore;
using MVC_WithAJAX.Models.Entities;

namespace MVC_WithAJAX.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
