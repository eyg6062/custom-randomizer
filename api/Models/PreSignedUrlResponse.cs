namespace custom_randomizer_api.Models
{
    public class PreSignedUrlResponse
    {
        public required string Url { get; set; }
        public required string ImageKey { get; set; }
    }

    public class PreSignedUrlBatchResponse : PreSignedUrlResponse
    {
        public required string ItemId { get; set; }
    }

    public class PreSignedUrlPutBatchDto
    {
        public required string ItemId { get; set; }
        public required string FileName { get; set; }
        public required string ContentType { get; set; }
    }
}
