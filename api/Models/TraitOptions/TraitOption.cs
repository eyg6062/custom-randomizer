using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models.TraitModels;

namespace custom_randomizer_api.Models.TraitOptions
{
    public class TraitOption
    {
        [Key]
        public int Id { get; set; }

        public string? Text { get; set; }
        public string? ImageKey { get; set; }

        public int TraitId { get; set; }

        [ForeignKey("TraitId")]
        public required BasicTrait BasicTrait { get; init; }

    }
}