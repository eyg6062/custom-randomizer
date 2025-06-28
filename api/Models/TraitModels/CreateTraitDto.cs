using custom_randomizer_api.Models.Enums;

namespace Models.TraitModels
{
    public class CreateTraitDto
    {
        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

    }
}
