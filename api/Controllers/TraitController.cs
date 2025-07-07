using custom_randomizer_api.Models;
using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.TraitModels;
using System.Diagnostics;

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
            var result = await _context.Traits.Select(x => new TraitDto
            {
                Id = x.Id,
                Name = x.Name,
				TraitType = x.TraitType,
                RandomizerId = x.RandomizerId,

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
		public async Task<IActionResult> GetTrait(int id)
		{
			var trait = await _context.Traits
                .Where(x => x.Id == id)
				.Select(x => new TraitDto
				{
					Id = x.Id,
					Name = x.Name,
					TraitType = x.TraitType,
                    RandomizerId = x.RandomizerId,

                }).FirstOrDefaultAsync();

            if (trait == null)
			{
				return NotFound();
			}

			return Ok(trait);
		}

        [HttpGet("randomizer/{randomizerId}")]
        public async Task<IActionResult> GetTraitsByRandomizer(int randomizerId)
        {
            var traits = await _context.Traits
				.Where(x => x.RandomizerId == randomizerId)
				//.Include(x => ((BasicTrait)x).TraitOptions)
				.ToListAsync();

			if (traits == null)
			{
				return NotFound();
			}

			var result = traits
				.AsParallel()
				.Select<Trait, TraitDto>(trait => trait switch
				{
					BasicTrait basic => new BasicTraitDto
					{
						Id = basic.Id,
						Name = basic.Name,
						TraitType = basic.TraitType,
						TraitOptions = basic.TraitOptions,
					},

					NumberTrait number => new NumberTraitDto
					{
						Id = number.Id,
						Name = number.Name,
						TraitType = number.TraitType,
						MinNum = number.MinNum,
						MaxNum = number.MaxNum,
					},

					ColorTrait color => new ColorTraitDto
					{
						Id = color.Id,
						Name = color.Name,
						TraitType = color.TraitType,
					},

					_ => throw new InvalidOperationException("Unknown trait type")
				})
				.ToList();

            return Ok(result);
        }

		[HttpPost]
        public async Task<IActionResult> CreateTrait(int randomizerId, [FromBody] CreateTraitDto traitDto)
		{
            var randomizer = await _context.Randomizers.FindAsync(randomizerId);

            if (randomizer == null) { return NotFound(); }

            Trait trait = traitDto.TraitType switch
            {
                TraitType.Basic => new BasicTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Basic,
                    Randomizer = randomizer,
                    // todo: set trait options here?
                },

                TraitType.Number => new NumberTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Number,
                    Randomizer = randomizer,
                    MinNum = ((CreateNumberTraitDto)traitDto).MinNum,
                    MaxNum = ((CreateNumberTraitDto)traitDto).MaxNum,
                },
                TraitType.Color => new ColorTrait
                {
                    Name = traitDto.Name,
                    TraitType = TraitType.Color,
                    Randomizer = randomizer,
                },
                _ => throw new InvalidOperationException("Invalid trait type")
            };

            _context.Traits.Add(trait);
            await _context.SaveChangesAsync();

            return Ok();
		}

        /*
        [HttpPost]
		public async Task<IActionResult> CreateTrait(int randomizerId,[FromBody] CreateTraitDto traitDto)
		{
            var randomizer = await _context.Randomizers.FindAsync(randomizerId);

            if (randomizer == null)
            {
                return NotFound();
            }

            var trait = new Trait
			{
				Name = traitDto.Name,
				TraitType = traitDto.TraitType,
				Randomizer = randomizer,
			};

            var result = new TraitDto
            {
                Id = trait.Id,
                Name = trait.Name,
                TraitType = trait.TraitType,
				RandomizerId = randomizer.Id,
            };

            _context.Traits.Add(trait);
			await _context.SaveChangesAsync();

			return Ok(result);
        }


        [HttpPut("{id}")]
		public async Task<IActionResult> PutTrait(int id, string? name) {

            var trait = await _context.Traits.FindAsync(id);

            if (trait == null)
            {
                return NotFound();
            }

			if (name != null) trait.Name = name;

            await _context.SaveChangesAsync(); 
			return Ok(); 
		}

		*/

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTrait(int id)
		{
			var trait = await _context.Traits.FindAsync(id);

            if (trait == null)
            {
                return NotFound();
            }

			_context.Traits.Remove(trait);
			await _context.SaveChangesAsync();

			return Ok(true);
		}
	}
}