using Microsoft.EntityFrameworkCore;

namespace react_tutorial_api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Test> Test { get; set; }

    }
}
