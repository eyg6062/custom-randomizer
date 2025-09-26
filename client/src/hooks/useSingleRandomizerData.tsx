import { useQuery } from "@tanstack/react-query"
import { Randomizer } from "../types/randomizer"
import { getRandomizer } from "../api/randomizer"

export function useSingleRandomizerData(id: string) {
    
    const { isFetching, isLoading, error, data: randomizerData } = useQuery<Randomizer>({
        queryKey: ['singleRandomizerData', id],
        queryFn: () => getRandomizer(id),
    })
    
    return { isFetching, isLoading, error, data: randomizerData }
}