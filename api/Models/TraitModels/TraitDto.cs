using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;

namespace Models.TraitModels
{
    public class TraitDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

        public int RandomizerId { get; set; }

    }

    public class BasicTraitDto : TraitDto
    {
        public ICollection<TraitOption> TraitOptions { get; set; } = new List<TraitOption>();
    }

    public class NumberTraitDto : TraitDto 
    {
        public int MinNum { get; set; }
        public int MaxNum { get; set; }
    }

    public class ColorTraitDto : TraitDto 
    { 
    }
}
