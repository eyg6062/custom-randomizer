namespace custom_randomizer_api.Models
{
    public class PreSignedUrlResponse
    {
        public required string Url { get; set; }
        public required string ImageKey { get; set; }
    }
}
