using custom_randomizer_api.Models;
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
				.Select(x => new TraitDto
				{
					Id = x.Id,
					Name = x.Name,
					TraitType = x.TraitType,
					RandomizerId = x.RandomizerId,
				})
                .ToListAsync();

            return Ok(traits);
        }

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