using custom_randomizer_api.Models.TraitOptions;
using Microsoft.EntityFrameworkCore;
using Models.RandomizerModels;
using Models.TraitModels;
using NodaTime;

namespace custom_randomizer_api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

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

            modelBuilder.Entity<TraitOption>()
                .HasQueryFilter(e => !e.Trait.IsDeleted);

            modelBuilder.Entity<TraitOption>()
                .HasOne(e => e.Trait)
                .WithMany(e => e.TraitOptions)
                .HasForeignKey(e => e.TraitId)
                .IsRequired();


            modelBuilder.Entity<Randomizer>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Randomizer>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Randomizer>()
                .HasQueryFilter(e => !e.IsDeleted);


            modelBuilder.Entity<Trait>()
                .HasOne(e => e.Randomizer)
                .WithMany(e => e.Traits)
                .HasForeignKey(e => e.RandomizerId)
                .IsRequired();

            modelBuilder.Entity<Trait>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Trait>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Trait>()
                .HasQueryFilter(e => !e.IsDeleted);


            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            var modifiedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified);

            var deletedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);

            foreach (var entity in modifiedEntities)
            {
                // checks if UpdatedAt property exists
                var updatedAtProperty = entity.Properties.FirstOrDefault(p => p.Metadata.Name == "UpdatedAt");
                if (updatedAtProperty != null)
                {
                    entity.Property("UpdatedAt").CurrentValue = SystemClock.Instance.GetCurrentInstant();
                }  
            }

            foreach (var entity in deletedEntities)
            {
                entity.Property("DeletedAt").CurrentValue = SystemClock.Instance.GetCurrentInstant();
                entity.Property("IsDeleted").CurrentValue = true;

                entity.State = EntityState.Modified;
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var modifiedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified);

            var deletedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);

            foreach (var entity in modifiedEntities)
            {
                // checks if UpdatedAt property exists
                var updatedAtProperty = entity.Properties.FirstOrDefault(p => p.Metadata.Name == "UpdatedAt");
                if (updatedAtProperty != null)
                {
                    entity.Property("UpdatedAt").CurrentValue = SystemClock.Instance.GetCurrentInstant();
                }
            }

            foreach (var entity in deletedEntities)
            {
                entity.Property("DeletedAt").CurrentValue = SystemClock.Instance.GetCurrentInstant();
                entity.Property("IsDeleted").CurrentValue = true;

                entity.State = EntityState.Modified;
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
