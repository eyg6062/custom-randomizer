using Amazon.S3;
using Amazon.S3.Model;
using custom_randomizer_api.Models;
using Microsoft.Extensions.Options;

namespace custom_randomizer_api.Services
{
    public class S3Service
    {
        readonly IAmazonS3 _s3Client;
        readonly string _bucketName;

        public S3Service(IAmazonS3 s3Client, IOptions<AwsSettings> awsOptions)
        {
            _s3Client = s3Client;
            _bucketName = awsOptions.Value.BucketName;
        }

        public string GeneratePresignedURL(string objectKey, string contentType)
        {
            string urlString = string.Empty;

            try
            {
                var request = new GetPreSignedUrlRequest()
                {
                    BucketName = _bucketName,
                    Key = objectKey,
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    ContentType = contentType,
                };
                urlString = _s3Client.GetPreSignedURL(request);
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Error:'{ex.Message}'");
            }

            return urlString;

        }
    }

}
