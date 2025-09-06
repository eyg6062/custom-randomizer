using custom_randomizer_api.Models;
using custom_randomizer_api.Models.Enums;
using custom_randomizer_api.Models.TraitOptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.RandomizerModels;
using Models.TraitModels;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
			var result = await _context.TraitOptions.Select(TraitOptionDto.Selector).ToListAsync();

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
                .Select(TraitOptionDto.Selector).ToListAsync();

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

			var traitOption = traitOptionDto.ToEntity((BasicTrait)trait);

			_context.TraitOptions.Add(traitOption);
			await _context.SaveChangesAsync();

			var result = TraitOptionDto.Map(traitOption);

            return Ok(result);
        }

        [HttpPost("Batch")]
        public async Task<IActionResult> CreateTraitOptions(int traitId, [FromBody] List<CreateTraitOptionDto> traitOptionDtos)
		{
            var trait = await _context.Traits.FindAsync(traitId);

            if (trait == null) return NotFound();
            if (trait is not BasicTrait basic) return BadRequest("Trait is not of type BasicTrait.");

			var traitOptions = traitOptionDtos.Select(x => x.ToEntity((BasicTrait)trait))
			.ToList();

            _context.TraitOptions.AddRange(traitOptions);
            await _context.SaveChangesAsync();

            return Ok(traitOptions.Select(TraitOptionDto.Map));
		}

        [HttpPut("Batch")]
        public async Task<IActionResult> PutTraitOptions([FromBody] List<PutTraitOptionDto> traitOptionDtos)
        {
            List<PutTraitOptionDtoWithStatus> result = new();

            var ids = traitOptionDtos.Select(x => x.Id).ToList();
            var options = await _context.TraitOptions
                .Where(x => ids.Contains(x.Id))
                .ToListAsync();

            foreach (var dto in traitOptionDtos)
            {
                var requestStatus = "Success";
                var option = options.Find(x => x.Id == dto.Id);
                if (option != null)
                {
                    option.Text = dto.Text ?? option.Text;
                    option.ImageKey = dto.ImageKey ?? option.ImageKey;
                }
                else
                {
                    requestStatus = "NotFound";
                }
                result.Add(new PutTraitOptionDtoWithStatus { Id = dto.Id, Text = dto.Text, ImageKey = dto.ImageKey, RequestStatus = requestStatus });
            }

            await _context.SaveChangesAsync();

            return Ok(result);
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

			return Ok();
		}

        [HttpDelete("Batch")]
        public async Task<IActionResult> DeleteTraitOption([FromBody] List<int> ids)
        {
            var results = new List<object>();

            var options = await _context.TraitOptions
                .Where(x => ids.Contains(x.Id))
                .ToListAsync();

            foreach (var id in ids)
            {
                var requestStatus = "Success";
                var option = options.Find(x => x.Id == id);
                if (option != null)
                {
                    _context.TraitOptions.Remove(option);
                } 
                else
                {
                    requestStatus = "NotFound";
                }
                results.Add(new { Id = id, RequestStatus = requestStatus });
            }
            await _context.SaveChangesAsync();

            return Ok(results);
        }
    }
}