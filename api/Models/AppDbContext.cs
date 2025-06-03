using custom_randomizer_api.Models.TraitOptions;
using Microsoft.EntityFrameworkCore;
using Models.Randomizer;

namespace custom_randomizer_api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Test> Test { get; set; }

        public DbSet<Randomizer> Randomizers { get; set; }

        public DbSet<Trait> Traits { get; set; }

        public DbSet<TraitOption> TraitOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TraitOption>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<NumberTraitOption>("Number")
                .HasValue<BasicTraitOption>("Text")
                .HasValue<ColorTraitOption>("Color");


            modelBuilder.Entity<Randomizer>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Randomizer>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()");


            modelBuilder.Entity<Trait>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Trait>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()");


            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            // updates UpdatedAt when changes are made

            var modifiedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified);

            foreach (var entity in modifiedEntities)
            {
                // checks if UpdatedAt property exists
                var updatedAtProperty = entity.Properties.FirstOrDefault(p => p.Metadata.Name == "UpdatedAt");
                if (updatedAtProperty != null)
                {
                    entity.Property("UpdatedAt").CurrentValue = DateTime.Now;
                }  
            }

            return base.SaveChanges();
        }
    }
}
