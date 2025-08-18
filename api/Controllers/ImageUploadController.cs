using custom_randomizer_api.Models;
using custom_randomizer_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace custom_randomizer_api.Controllers
{
	[ApiController]
    [Route("api/[controller]")]
    public class ImageUploadController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly S3Service _s3Service;

        public ImageUploadController(AppDbContext context, S3Service s3Service)
        {
            _context = context;
            _s3Service = s3Service;
        }

        [HttpGet("PreSignedUrlPut")]
        public ActionResult GetPreSignedUrl(string fileName, string contentType)
        {
            var key = _s3Service.GenerateUniqueKey(fileName);
            var url = _s3Service.GeneratePresignedURL(key, Amazon.S3.HttpVerb.PUT, contentType);
            return Ok(new PreSignedUrlResponse { Url = url });
        }

        [HttpGet("PreSignedUrlGet")]
        public ActionResult GetPreSignedUrl(string imageKey)
        {
            var url = _s3Service.GeneratePresignedURL(imageKey, Amazon.S3.HttpVerb.GET);
            return Ok(new PreSignedUrlResponse { Url = url });
        }

    }
}
