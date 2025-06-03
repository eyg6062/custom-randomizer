namespace Models.Randomizer
{
    public class CreateRandomizerDto
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}