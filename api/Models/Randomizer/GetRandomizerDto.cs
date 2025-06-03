namespace Models.Randomizer
{
    public class GetRandomizerDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}