﻿using custom_randomizer_api.Models.Enums;
using Models.RandomizerModels;
using NodaTime;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.TraitModels
{
    public abstract class Trait
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public TraitType TraitType { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Instant CreatedAt { get; set; }

        public Instant UpdatedAt { get; set; }

        public Instant? DeletedAt { get; set; }

        public bool IsDeleted { get; set; } = false;

        public int RandomizerId { get; set; }

        [ForeignKey(nameof(RandomizerId))]
        public required Randomizer Randomizer { get; init; }

    }
}
