using custom_randomizer_api.Models.TraitOptions;

namespace Models.TraitModels
{
    public class BasicTrait : Trait
    {
        public ICollection<TraitOption> TraitOptions { get; } = new List<TraitOption>();

    }
}
