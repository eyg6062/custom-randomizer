using custom_randomizer_api.Models.Enums;

namespace Models.TraitModels
{
    public class TraitDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

        public int RandomizerId { get; set; }

    }
}
