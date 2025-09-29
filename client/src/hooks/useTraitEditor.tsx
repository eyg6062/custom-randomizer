import { AnyTrait, CreateAnyTraitDto, EditTraitDto } from "../types/trait";
import { apiDeleteTrait, postTrait, putTrait } from "../api/trait";
import { useDeleteMutation, useEditMutation, useCreateMutation } from "./itemMutations";

export function useTraitEditor(queryKey: string, single: boolean) {
    const editMutation = useEditMutation<AnyTrait, EditTraitDto>(queryKey, single, putTrait);
    const deleteMutation = useDeleteMutation<AnyTrait>(queryKey, single, apiDeleteTrait);
    const createMutation = useCreateMutation<AnyTrait, CreateAnyTraitDto>(queryKey, single, postTrait);

    const editTraitName = async (data: AnyTrait, renameValue: string) => {
        const editDto: EditTraitDto = {traitType: data.traitType, randomizerId: data.randomizerId, name: renameValue};
        await editMutation.mutateAsync({data, editDto: editDto});
    }

    const deleteTrait = async (data: AnyTrait) => {
        await deleteMutation.mutateAsync({data});
    }

    const createTrait = async (data: CreateAnyTraitDto) => {
        await createMutation.mutateAsync({dto: data});
    }

    return {editTraitName, deleteTrait, createTrait}
}
