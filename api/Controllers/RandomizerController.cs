using custom_randomizer_api.Models;
using custom_randomizer_api.Services;
using custom_randomizer_api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.RandomizerModels;
using Models.TraitModels;

namespace custom_randomizer_api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RandomizerController : ControllerBase
	{
		private readonly AppDbContext _context;
        private readonly S3Service _s3Service;

        public RandomizerController(AppDbContext context, S3Service s3Service)
		{
			_context = context;
			_s3Service = s3Service;
		}

		[HttpGet]
		public async Task<IActionResult> GetRandomizers()
		{
			var result = await _context.Randomizers.Select(GetRandomizerDto.Selector).ToListAsync();

			return Ok(result);
		}

        [HttpGet("WithImageUrl")]
        public async Task<IActionResult> GetRandomizersWithImageUrl()
		{
			var randomizers = await _context.Randomizers.Select(GetRandomizerDto.Selector).ToListAsync();

            var result = randomizers
                .AsParallel()
                .Select(randomizer => {
					string? preSignedUrl = null;
					if (randomizer.ImageKey != null)
					{
						preSignedUrl = _s3Service.GeneratePresignedURL(randomizer.ImageKey, Amazon.S3.HttpVerb.GET);
                    }

					return new GetRandomizerWithImageDto
					{
						Id = randomizer.Id,
						Name = randomizer.Name,
						Description = randomizer.Description,
						ImageKey = randomizer.ImageKey,
						ImageUrl = preSignedUrl,
					};
				})
                .ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
		public async Task<IActionResult> GetRandomizer(int id)
		{
			var randomizer = await _context.Randomizers
				.Where(x => x.Id == id)
				.Select(GetRandomizerDto.Selector).FirstOrDefaultAsync();

            if (randomizer == null)
			{
				return NotFound();
			}

			return Ok(randomizer);
		}

		[HttpPost]
		public async Task<IActionResult> CreateRandomizer([FromBody] CreateRandomizerDto randomizerDto)
		{
			var randomizer = randomizerDto.ToEntity();

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

            randomizer.Name = randomizerDto.Name ?? randomizer.Name;
            randomizer.Description = randomizerDto.Description ?? randomizer.Description;
            randomizer.ImageKey = randomizerDto.ImageKey ?? randomizer.ImageKey;

            await _context.SaveChangesAsync(); 
			return Ok(GetRandomizerDto.Map(randomizer)); 
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