import { useQuery } from "@tanstack/react-query";
import { TraitCardProps } from "../../types/trait";
import { getTraitsByRandomizer } from "../../api/trait";
import { QueryKey } from "../../types/queryKeys";

export function useTraitData (randomizerId: string) {
    const { isFetching, isLoading, error, data: traitData } = useQuery<TraitCardProps[]>({
        queryKey: [QueryKey.TraitData],
        queryFn: () => getTraitsByRandomizer(randomizerId),
        initialData: [],
    })

    return {isFetching, isLoading, error, traitData};
}