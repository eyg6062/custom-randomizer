import { useQuery } from "@tanstack/react-query"
import { getRandomizersWithImageUrl } from "../../api/randomizer"
import { RandomizerCardProps } from "../../types/randomizer";
import { QueryKey } from "../../types/queryKeys";

export function useRandomizersData () {
    const { isFetching, error, data: randomizerData } = useQuery<RandomizerCardProps[]>({
        queryKey: [QueryKey.RandomizerData],
        queryFn: getRandomizersWithImageUrl
    })

    return {isFetching, error, randomizerData};
}