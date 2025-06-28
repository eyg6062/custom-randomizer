using Models.TraitModels;
using NodaTime;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.RandomizerModels
{
    public class Randomizer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Instant CreatedAt { get; set; }

        public Instant UpdatedAt { get; set; }

        public Instant? DeletedAt { get; set; }

        public bool IsDeleted { get; set; } = false;

        public ICollection<Trait> Traits { get; } = new List<Trait>();

    }
}