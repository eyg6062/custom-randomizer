using custom_randomizer_api.Models.TraitOptions;
using Models.TraitModels;

namespace custom_randomizer_api.Models.Enums
{
    public static class TraitTypeMapper
    {
        static public TraitDto MapTraitType(Trait trait)
        {
            return trait switch
            {
                BasicTrait basic => new BasicTraitDto
                {
                    Id = basic.Id,
                    Name = basic.Name,
                    TraitType = basic.TraitType,
                    RandomizerId = basic.RandomizerId,
                    TraitOptions = basic.TraitOptions
                        .Select(x => new TraitOptionDto
                        {
                            Id = x.Id,
                            Text = x.Text,
                            ImageUrl = x.ImageUrl,
                            TraitId = x.TraitId,
                        })
                        .ToList(),
                },

                NumberTrait number => new NumberTraitDto
                {
                    Id = number.Id,
                    Name = number.Name,
                    TraitType = number.TraitType,
                    RandomizerId = number.RandomizerId,
                    MinNum = number.MinNum,
                    MaxNum = number.MaxNum,
                },

                ColorTrait color => new ColorTraitDto
                {
                    Id = color.Id,
                    Name = color.Name,
                    TraitType = color.TraitType,
                    RandomizerId = color.RandomizerId,
                },

                _ => throw new InvalidOperationException("Unknown trait type")
            };
        }

    }
}
