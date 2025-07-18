using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models.TraitModels;

namespace custom_randomizer_api.Models.TraitOptions
{
    public class TraitOptionDto
    {
        public int Id { get; set; }

        public string? Text { get; set; }
        public string? ImageUrl { get; set; }

        public int TraitId { get; set; }

    }

    public class CreateTraitOptionDto
    {
        public string? Text { get; set; }
        public string? ImageUrl { get; set; }
    }
}