using custom_randomizer_api.Models;
using custom_randomizer_api.Models.TraitOptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.RandomizerModels;
using Models.TraitModels;

namespace custom_randomizer_api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TraitOptionController : ControllerBase
	{
		private readonly AppDbContext _context;

		public TraitOptionController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetTraitOptions()
		{
			var result = await _context.TraitOptions.Select(x => new TraitOptionDto
            {
				Id = x.Id,
				Text = x.Text,
				ImageUrl = x.ImageUrl,
				TraitId = x.TraitId,

			}).ToListAsync();

			return Ok(result);
		}

        [HttpGet("ByTrait/{traitId}")]
        public async Task<IActionResult> GetTraitOptionsByTrait(int traitId)
		{

            var trait = await _context.Traits.FindAsync(traitId);

            if (trait == null)
            {
                return NotFound();
            } 
			else if (trait is not BasicTrait basic) 
			{
                return BadRequest("Trait is not of type BasicTrait.");
            }

            var result = await _context.TraitOptions
                .Where(x => x.TraitId == traitId)
                .Select(x => new TraitOptionDto
				{
					Id = x.Id,
					Text = x.Text,
					ImageUrl = x.ImageUrl,
					TraitId = x.TraitId,

				}).ToListAsync();

            return Ok(result);
		}


        [HttpPost]
		public async Task<IActionResult> CreateTraitOption(int traitId, [FromBody] CreateTraitOptionDto traitOptionDto)
		{
            var trait = await _context.Traits.FindAsync(traitId);

            if (trait == null)
            {
                return NotFound();
            }
            else if (trait is not BasicTrait basic)
            {
                return BadRequest("Trait is not of type BasicTrait.");
            }

            var traitOption = new TraitOption
			{
				Text = traitOptionDto.Text,
				ImageUrl = traitOptionDto.ImageUrl,
				BasicTrait = (BasicTrait)trait,
			};

			_context.TraitOptions.Add(traitOption);
			await _context.SaveChangesAsync();

			var result = new TraitOptionDto
			{
				Id = traitOption.Id,
				Text = traitOption.Text,
				ImageUrl = traitOption.ImageUrl,
				TraitId = traitOption.TraitId,
			};

            return Ok(result);
        }

        [HttpPost("Batch")]
        public async Task<IActionResult> CreateTraitOptions(int traitId, [FromBody] List<CreateTraitOptionDto> traitOptionDtos)
		{
            var trait = await _context.Traits.FindAsync(traitId);

            if (trait == null)
            {
                return NotFound();
            }
            else if (trait is not BasicTrait basic)
            {
                return BadRequest("Trait is not of type BasicTrait.");
            }

			var traitOptions = traitOptionDtos.Select(x => new TraitOption
			{
				Text = x.Text,
				ImageUrl = x.ImageUrl,
				BasicTrait = (BasicTrait)trait,
			})
			.ToList();

            _context.TraitOptions.AddRange(traitOptions);
            await _context.SaveChangesAsync();

            return Ok(true);
		}


        [HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTraitOption(int id)
		{
			var traitOption = await _context.TraitOptions.FindAsync(id);

            if (traitOption == null)
            {
                return NotFound();
            }

			_context.TraitOptions.Remove(traitOption);
			await _context.SaveChangesAsync();

			return Ok(true);
		}
	}
}