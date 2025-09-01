using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;
using System.Text.Json.Serialization;

namespace Models.TraitModels
{
    [JsonPolymorphic]
    [JsonDerivedType(typeof(NumberTraitDto))]
    [JsonDerivedType(typeof(ColorTraitDto))]
    [JsonDerivedType(typeof(BasicTraitDto))]
    public class TraitDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

        public int RandomizerId { get; set; }

    }

    public class BasicTraitDto : TraitDto
    {
        public ICollection<TraitOptionDto> TraitOptions { get; set; } = new List<TraitOptionDto>();
    }

    public class BasicTraitWithImageDto : TraitDto
    {
        public ICollection<TraitOptionWithImageDto> TraitOptions { get; set; } = new List<TraitOptionWithImageDto>();
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
