import { useQuery } from "@tanstack/react-query";
import { getBasicTraitWithOptionImage } from "../../api/trait";
import { QueryKey } from "../../types/queryKeys";
import { EditStatus, TraitOption, TraitOptionEditProps } from "../../types/traitOption";
import { useEffect, useState } from "react";

export function useTraitOptionData (traitId: string) {
    const [optionData, setOptionData] = useState<TraitOptionEditProps[]>([]);

    const fetchTraitOptions = async () => {
        const response = await getBasicTraitWithOptionImage(traitId);
        const options: TraitOption[] = response.traitOptions;
        const result: TraitOptionEditProps[] = options.map(option => ({
            ...option,
            editStatus: EditStatus.Original,
        }));
        return result;
    }

    const { isFetching, isLoading, error, data: fetchData } = useQuery<TraitOptionEditProps[]>({
        queryKey: [QueryKey.TraitOptionData],
        queryFn: fetchTraitOptions,
        initialData: [],
    })

    useEffect(() => {
        if (fetchData) {
            setOptionData(fetchData)
            console.log(fetchData);
        }
    }, [fetchData])

    return {isFetching, isLoading, error, optionData, setOptionData};
}