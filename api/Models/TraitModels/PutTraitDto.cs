using custom_randomizer_api.Models.Enums;
using System.Text.Json.Serialization;

namespace Models.TraitModels
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "traitType")]
    [JsonDerivedType(typeof(PutBasicTraitDto), (int)TraitType.Basic)]
    [JsonDerivedType(typeof(PutNumberTraitDto), (int)TraitType.Number)]
    [JsonDerivedType(typeof(PutColorTraitDto), (int)TraitType.Color)]
    public class PutTraitDto
    {
        public TraitType TraitType { get; set; }
        public string? Name { get; set; }
    }


    public class PutBasicTraitDto : PutTraitDto
    {
    }


    public class PutNumberTraitDto : PutTraitDto
    {
        public int? MinNum { get; set; }
        public int? MaxNum { get; set; }
    }


    public class PutColorTraitDto : PutTraitDto
    {
    }
}
