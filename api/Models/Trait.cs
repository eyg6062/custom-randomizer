using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;
using Models.Randomizer;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace custom_randomizer_api.Models
{
    public class Trait
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdatedAt { get; set; }

        public int RandomizerId { get; set; }

        [ForeignKey("RandomizerId")]
        public required Randomizer Randomizer { get; set; }

        public ICollection<TraitOption> TraitOptions { get; } = new List<TraitOption>();

    }
}
