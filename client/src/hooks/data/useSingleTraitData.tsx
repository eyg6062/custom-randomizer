import { useQuery } from "@tanstack/react-query"
import { QueryKey } from "../../types/queryKeys";
import { getTrait } from "../../api/trait";
import { AnyTrait } from "../../types/trait";

export function useSingleTraitData (id: string) {
    const { isFetching, isLoading, error, data: singleTraitData } = useQuery<AnyTrait>({
        queryKey: [QueryKey.SingleTraitData],
        queryFn: () => getTrait(id),
    })

    return {isFetching, isLoading, error, singleTraitData};
}