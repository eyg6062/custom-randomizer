using custom_randomizer_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.RandomizerModels;

namespace custom_randomizer_api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RandomizerController : ControllerBase
	{
		private readonly AppDbContext _context;

		public RandomizerController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetRandomizers()
		{
			var result = await _context.Randomizers.Select(x => new GetRandomizerDto
			{
				Id = x.Id,
				Name = x.Name,
				Description = x.Description,
				ImageUrl = x.ImageUrl

			}).ToListAsync();

			return Ok(result);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetRandomizer(int id)
		{
			var randomizer = await _context.Randomizers
				.Where(x => x.Id == id)
				.Select(x => new GetRandomizerDto
				{
					Id = x.Id,
					Name = x.Name,
					Description = x.Description,
					ImageUrl = x.ImageUrl

				}).FirstOrDefaultAsync();

            if (randomizer == null)
			{
				return NotFound();
			}

			return Ok(randomizer);
		}

		[HttpPost]
		public async Task<IActionResult> CreateRandomizer([FromBody] CreateRandomizerDto randomizerDto)
		{
			var randomizer = new Randomizer
			{
				Name = randomizerDto.Name,
				Description = randomizerDto.Description,
				ImageUrl = randomizerDto.ImageUrl
			};

			_context.Randomizers.Add(randomizer);
			await _context.SaveChangesAsync();

			return Ok(randomizer);
        }

		[HttpPut("{id}")]
		public async Task<IActionResult> PutRandomizer(int id, [FromBody] PutRandomizerDto randomizerDto) {

            var randomizer = await _context.Randomizers.FindAsync(id);

            if (randomizer == null)
            {
                return NotFound();
            }

			if (randomizerDto.Name != null) randomizer.Name = randomizerDto.Name;
            if (randomizerDto.Description != null) randomizer.Description = randomizerDto.Description;
			if (randomizerDto.ImageUrl != null) randomizer.ImageUrl = randomizerDto.ImageUrl;

            await _context.SaveChangesAsync(); 
			return Ok(); 
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteRandomizer(int id)
		{
			var randomizer = await _context.Randomizers.FindAsync(id);

            if (randomizer == null)
            {
                return NotFound();
            }

			_context.Randomizers.Remove(randomizer);
			await _context.SaveChangesAsync();

			return Ok(true);
		}
	}
}