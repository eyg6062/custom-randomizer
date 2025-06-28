namespace Models.RandomizerModels
{
    public class CreateRandomizerDto
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}