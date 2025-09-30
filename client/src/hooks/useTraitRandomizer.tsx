import { AnyTrait, TraitCardProps } from "../types/trait";
import { useParams } from "react-router";
import { randomizeTrait } from "../Utils/traitRandomizer";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../types/queryKeys";

export function useTraitRandomizer () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    const queryClient = useQueryClient();
    const queryKey = QueryKey.TraitData;

    // randomizes trait card on click 
    const handleUpdateTraitCard = async (selectedTrait: AnyTrait) => {
        const updatedTrait: TraitCardProps = await randomizeTrait(selectedTrait as AnyTrait);

        queryClient.setQueryData<TraitCardProps[]>([queryKey], (old) => {
            if (!old) {console.log("couldn't get trait query data"); return;}
            return old.map(trait => trait.id === selectedTrait.id ? updatedTrait : trait)
        });
    }

    // Clears all trait cards
    const clearAllCards = () => {
        queryClient.setQueryData<TraitCardProps[]>([queryKey], (old) => {
            if (!old) {console.log("couldn't get trait query data"); return;}
            return old.map(trait => {
                return {...trait, imageUrl: undefined, value: undefined};
            })
        })
    }

    // randomizes all trait cards
    const randomizeAllCards = async () => {
        const traitData = queryClient.getQueryData<TraitCardProps[]>([queryKey]);
        if (!traitData) { console.log("couldn't get trait query data"); return; }

        const updatedTraits = await Promise.all(
            traitData.map(async (trait) => {
                return await randomizeTrait(trait);
            })
        )

        queryClient.setQueryData<TraitCardProps[]>([queryKey], updatedTraits);
    }

    return {
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards
    };

}