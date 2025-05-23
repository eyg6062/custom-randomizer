using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_tutorial_api.Models;

namespace react_tutorial_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public TestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetTest")]
        public async Task<IActionResult> GetTest()
        {
            var result = await _context.Test.Select(x => new Test
            {
                Id = x.Id,
                Name = x.Name,

            }).ToListAsync();

            return Ok(result);
        }

        [HttpPost("CreateTest")]
        public async Task<IActionResult> CreateTest(Test test)
        {
            _context.Test.Add(test);
            await _context.SaveChangesAsync();

            return Ok(test);
        }

        [HttpDelete("DeleteTest")]
        public async Task<IActionResult> DeleteTest(int testId)
        {
            var rows = await _context.Test.Where(x => x.Id == testId).ExecuteDeleteAsync();

            return Ok(true);
        }
    }
}
