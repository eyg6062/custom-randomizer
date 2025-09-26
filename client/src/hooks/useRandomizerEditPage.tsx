import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRandomizer } from "../api/randomizer";
import { EditRandomizerDto, Randomizer } from "../types/randomizer";
import { showErrorNotification } from "../Utils/showNotifications";
import { editDtoOverride } from "../Utils/dtoOverride";
import { ItemType } from "../types/modalProps";
import { useSingleRandomizerData } from "./useSingleRandomizerData";
import { useParams } from "react-router";

export function useRandomizerEditPage() {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    // randomizer data
    const singleRandQuery = useSingleRandomizerData(id);
    const randomizerData = singleRandQuery.data;

    const queryClient = useQueryClient();

    const editRandomizer = async (data: Randomizer, editDto: EditRandomizerDto, errorMsg: string = "failed to edit randomizer") => {
        const editMutation = useMutation({
            mutationFn: ({ data, editDto }: { data: Randomizer; editDto: EditRandomizerDto }) => putRandomizer(data.id, editDto),
            onSuccess: (_, {data, editDto}) => {
                queryClient.setQueryData<Randomizer>(["singleRandomizerData"], editDtoOverride<Randomizer>(data, editDto) )
            },
            onError: () => showErrorNotification(new Error(errorMsg)),
        })

        editMutation.mutate({data, editDto});
    }

    const handleSubmitRandRename = async (item: ItemType, renameInput: string) => {
        await editRandomizer(item as Randomizer, {name: renameInput});
    }

    const handleSubmitEditDesc = async (item: ItemType, descInput: string) => {
        await editRandomizer(item as Randomizer, {description: descInput});
    }

    return {
        singleRandQuery,
        randomizerData,
        handleSubmitRandRename,
        handleSubmitEditDesc
    }
}