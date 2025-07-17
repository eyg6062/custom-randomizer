using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;
using System.Text.Json.Serialization;

namespace Models.TraitModels
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "traitType")]
    [JsonDerivedType(typeof(CreateBasicTraitDto), (int)TraitType.Basic)]
    [JsonDerivedType(typeof(CreateNumberTraitDto), (int)TraitType.Number)]
    [JsonDerivedType(typeof(CreateColorTraitDto), (int)TraitType.Color)]
    public class CreateTraitDto
    {
        public TraitType TraitType { get; set; }
        public string? Name { get; set; }
    }


    public class CreateBasicTraitDto : CreateTraitDto
    {
        public ICollection<TraitOption> TraitOptions { get; set; } = new List<TraitOption>();
    }


    public class CreateNumberTraitDto : CreateTraitDto
    {
        public int MinNum { get; set; }
        public int MaxNum { get; set; }
    }


    public class CreateColorTraitDto : CreateTraitDto
    {
    }
}
