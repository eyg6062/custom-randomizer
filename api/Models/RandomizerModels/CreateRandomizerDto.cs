using System.Linq.Expressions;

namespace Models.RandomizerModels
{
    public class CreateRandomizerDto
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageKey { get; set; }

        public Randomizer ToEntity()
        {
            return new Randomizer
            {
                Name = Name,
                Description = Description,
                ImageKey = ImageKey
            };
        }

    }
}