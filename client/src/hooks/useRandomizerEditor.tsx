import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditRandomizerDto, Randomizer } from "../types/randomizer";
import { putRandomizer } from "../api/randomizer";
import { editDtoOverride } from "../Utils/dtoOverride";
import { showErrorNotification } from "../Utils/showNotifications";

export function useRandomizerEditor(queryKey: string, single: boolean) {
    const queryClient = useQueryClient();

    const editMutation = useMutation({
        mutationFn: ({ data, editDto }: { data: Randomizer; editDto: EditRandomizerDto }) => putRandomizer(data.id, editDto),
        onSuccess: (_, {data, editDto}) => {
            // if it's a single object vs. an array of objects
            if (single) {
                queryClient.setQueryData<Randomizer>([queryKey], (old) => editDtoOverride(old, editDto) );
                const meep = queryClient.getQueryData<Randomizer>([queryKey])
                console.log(meep)
                console.log(queryKey)
            }
            else
                queryClient.setQueryData<Randomizer[]>([queryKey], (old = []) => 
                    old.map(oldItem => oldItem.id === data.id ? editDtoOverride<Randomizer>(oldItem, editDto) : oldItem)
                )
        },
        onError: () => showErrorNotification(new Error("failed to edit randomizer")),
    })

    const editRandName = async (data: Randomizer, renameValue: string) => {
        await editMutation.mutate({data, editDto: {name: renameValue}})
    }

    const editRandDesc = async (data: Randomizer, descValue: string) => {
        await editMutation.mutate({data, editDto: {description: descValue}})
    }

    return {editRandName, editRandDesc}
}
