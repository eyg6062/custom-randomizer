using custom_randomizer_api.Models.TraitOptions;
using System.Linq.Expressions;

namespace Models.RandomizerModels
{
    public class GetRandomizerDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageKey { get; set; }

        public static Expression<Func<Randomizer, GetRandomizerDto>> Selector =>
            randomizer => new GetRandomizerDto
            {
                Id = randomizer.Id,
                Name = randomizer.Name,
                Description = randomizer.Description,
                ImageKey = randomizer.ImageKey
            };

        public static GetRandomizerDto Map(Randomizer randomizer) => new GetRandomizerDto
        {
            Id = randomizer.Id,
            Name = randomizer.Name,
            Description = randomizer.Description,
            ImageKey = randomizer.ImageKey
        };
    }

    public class GetRandomizerWithImageDto : GetRandomizerDto
    {
        public string? PreSignedUrl { get; set; }
    }
}