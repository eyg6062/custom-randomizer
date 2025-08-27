using custom_randomizer_api.Models;
using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.TraitModels;

namespace custom_randomizer_api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TraitController : ControllerBase
	{
		private readonly AppDbContext _context;

		public TraitController(AppDbContext context)
		{
			_context = context;
		}

        [HttpGet]
        public async Task<IActionResult> GetTraits()
        {
            var traits = await _context.Traits
                .Include(x => ((BasicTrait)x).TraitOptions)
                .ToListAsync();

            var result = traits
                .AsParallel()
                .Select(TraitTypeMapper.MapTraitType)
                .ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
		public async Task<IActionResult> GetTrait(int id)
		{
            var trait = await _context.Traits.FindAsync(id);

            if (trait == null)
			{
				return NotFound();
			}

			return Ok(TraitTypeMapper.MapTraitType(trait));
		}

        [HttpGet("ByRandomizer/{randomizerId}")]
        public async Task<IActionResult> GetTraitsByRandomizer(int randomizerId)
        {
            var traits = await _context.Traits
				.Where(x => x.RandomizerId == randomizerId)
				.Include(x => ((BasicTrait)x).TraitOptions)
				.ToListAsync();

			if (traits == null)
			{
				return NotFound();
			}

			var result = traits
				.AsParallel()
				.Select(TraitTypeMapper.MapTraitType)
				.ToList();

            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTrait(int randomizerId, [FromBody] CreateTraitDto traitDto)
		{
            // note: the first property in the json needs to be $traitType

            var randomizer = await _context.Randomizers.FindAsync(randomizerId);

            if (randomizer == null) { return NotFound(); }

            Trait trait = traitDto switch
            {
                CreateBasicTraitDto basic => new BasicTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Basic,
                    Randomizer = randomizer,
                    // todo: set trait options here
                },

                CreateNumberTraitDto number => new NumberTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Number,
                    Randomizer = randomizer,
                    MinNum = ((CreateNumberTraitDto)traitDto).MinNum,
                    MaxNum = ((CreateNumberTraitDto)traitDto).MaxNum,
                },
                CreateColorTraitDto color => new ColorTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Color,
                    Randomizer = randomizer,
                },
                _ => throw new InvalidOperationException("Invalid trait type")
            };

            _context.Traits.Add(trait);
            await _context.SaveChangesAsync();

            return Ok(TraitTypeMapper.MapTraitType(trait));
		}

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrait(int id, [FromBody] PutTraitDto traitDto)
        {
            var trait = await _context.Traits.FindAsync(id);
            if (trait == null) return NotFound();

            trait.Name = traitDto.Name ?? trait.Name;

            switch (trait)
            {
                case BasicTrait basic:
                    break;

                case NumberTrait number:
                    if (traitDto is PutNumberTraitDto numberTraitDto)
                    {
                        number.MinNum = numberTraitDto.MinNum ?? number.MinNum;
                        number.MaxNum = numberTraitDto.MaxNum ?? number.MaxNum;
                    } else
                    {
                        return BadRequest();
                    }
                    break;

                case ColorTrait color:
                    break;
            }

            await _context.SaveChangesAsync();

            return Ok(TraitTypeMapper.MapTraitType(trait));
        }

        [HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTrait(int id)
		{
			var trait = await _context.Traits.FindAsync(id);

            if (trait == null) return NotFound();

			_context.Traits.Remove(trait);
			await _context.SaveChangesAsync();

			return Ok();
		}
	}
}