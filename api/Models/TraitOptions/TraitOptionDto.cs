
using custom_randomizer_api.Models.Enums;
using Models.RandomizerModels;
using Models.TraitModels;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace custom_randomizer_api.Models.TraitOptions
{
    public class TraitOptionDto
    {
        public int Id { get; set; }

        public string? Text { get; set; }
        public string? ImageKey { get; set; }

        public int TraitId { get; set; }

        public static TraitOptionDto Map(TraitOption x) => new TraitOptionDto
        {
            Id = x.Id,
            Text = x.Text,
            ImageKey = x.ImageKey,
            TraitId = x.TraitId
        };

        public static Expression<Func<TraitOption, TraitOptionDto>> Selector =>
            option => new TraitOptionDto
            {
                Id = option.Id,
                Text = option.Text,
                ImageKey = option.ImageKey,
                TraitId = option.TraitId
            };

    }

    public class TraitOptionWithImageDto : TraitOptionDto
    {
        public string? ImageUrl { get; set; }

    }

    public class CreateTraitOptionDto
    {
        public string? Text { get; set; }
        public string? ImageKey { get; set; }

        public TraitOption ToEntity(BasicTrait trait)
        {
            return new TraitOption
            {
                Text = Text,
                ImageKey = ImageKey,
                BasicTrait = trait
            };
        }
    }

    public class PutTraitOptionDto
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public string? ImageKey { get; set; }
    }

    public class PutTraitOptionDtoWithStatus : PutTraitOptionDto
    {
        public required string RequestStatus { get; set; }
    }
}