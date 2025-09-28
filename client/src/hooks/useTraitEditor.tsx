import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRandomizer } from "../api/randomizer";
import { editDtoOverride } from "../Utils/dtoOverride";
import { showErrorNotification } from "../Utils/showNotifications";
import { AnyTrait, EditTraitDto } from "../types/trait";

export function useTraitEditor(queryKey: string, single: boolean) {
    const queryClient = useQueryClient();

    const editMutation = useMutation({
        mutationFn: ({ data, editDto }: { data: AnyTrait; editDto: EditTraitDto }) => putRandomizer(data.id, editDto),
        onSuccess: (_, {data, editDto}) => {
            // if it's a single object vs. an array of objects
            if (single) {
                queryClient.setQueryData<AnyTrait>([queryKey], (old) => editDtoOverride(old, editDto) );
            }
            else
                queryClient.setQueryData<AnyTrait[]>([queryKey], (old = []) => 
                    old.map(oldItem => oldItem.id === data.id ? editDtoOverride<AnyTrait>(oldItem, editDto) : oldItem)
                )
        },
        onError: () => showErrorNotification(new Error("failed to edit randomizer")),
    })

    const editTraitName = async (data: AnyTrait, renameValue: string) => {
        const editDto: EditTraitDto = {traitType: data.traitType, name: renameValue};
        await editMutation.mutate({data, editDto: editDto});
    }



    return {editTraitName}
}
