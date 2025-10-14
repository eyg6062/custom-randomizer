import { useQuery } from "@tanstack/react-query"
import { Randomizer } from "../../types/randomizer"
import { getRandomizer } from "../../api/randomizer"

export function useSingleRandomizerData(id: string) {
    
    const { isPending, isFetching, error, data: randomizerData } = useQuery<Randomizer>({
        queryKey: ['singleRandomizerData'],
        queryFn: () => getRandomizer(id),
    })
    
    return { isPending, isFetching, error, randomizerData }
}