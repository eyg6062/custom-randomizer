using Microsoft.EntityFrameworkCore;

namespace custom_randomizer_api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Test> Test { get; set; }

    }
}
