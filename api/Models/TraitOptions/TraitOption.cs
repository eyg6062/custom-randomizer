using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models.TraitModels;

namespace custom_randomizer_api.Models.TraitOptions
{
    public abstract class TraitOption
    {
        [Key]
        public int Id { get; set; }

        public int TraitId { get; set; }

        [ForeignKey("TraitId")]
        public required Trait Trait { get; init; }

    }
}