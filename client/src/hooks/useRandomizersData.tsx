import { useQuery } from "@tanstack/react-query"
import { getRandomizersWithImageUrl } from "../api/randomizer"
import { RandomizerCardProps } from "../types/randomizer";

export function useRandomizersData () {
    const { isFetching, isLoading, error, data: randomizerData } = useQuery<RandomizerCardProps[]>({
        queryKey: ['randomizerData'],
        queryFn: getRandomizersWithImageUrl,
        initialData: [],
    })

    return {isFetching, isLoading, error, randomizerData};
}