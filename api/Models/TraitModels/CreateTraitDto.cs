using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;

namespace Models.TraitModels
{
    public class CreateTraitDto
    {
        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

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
