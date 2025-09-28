import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRandomizerDto, EditRandomizerCardDto, EditRandomizerDto, Randomizer, RandomizerCardProps } from "../types/randomizer";
import { apiDeleteRandomizer, putRandomizer } from "../api/randomizer";
import { editDtoOverride } from "../Utils/dtoOverride";
import { showErrorNotification } from "../Utils/showNotifications";
import { createRandomizer } from "../Utils/randomizerEditor";
import { uploadImage } from "../api/imageUpload";

export function useRandomizerEditor(queryKey: string, single: boolean) {
    const queryClient = useQueryClient();

    const editMutation = useMutation({
        mutationFn: ({ data, editDto }: { data: Randomizer | RandomizerCardProps; editDto: EditRandomizerDto | EditRandomizerCardDto }) => putRandomizer(data.id, editDto),
        onSuccess: (_, {data, editDto}) => {
            // if it's a single object vs. an array of objects
            if (single) {
                queryClient.setQueryData<Randomizer>([queryKey], (old) => editDtoOverride(old, editDto) );
            }
            else
                queryClient.setQueryData<Randomizer[]>([queryKey], (old = []) => 
                    old.map(oldItem => oldItem.id === data.id ? editDtoOverride<Randomizer>(oldItem, editDto) : oldItem)
                )
        },
        onError: () => showErrorNotification(new Error("failed to edit randomizer")),
    })

    const createMutation = useMutation({
        mutationFn: (data: CreateRandomizerDto) => createRandomizer(data),
        onSuccess: (response, dtoVars) => {

            let imageUrl;
            if (response.imageKey && dtoVars.imageFile) {
                imageUrl = URL.createObjectURL(dtoVars.imageFile);
            }

            const newRand : RandomizerCardProps = {
                id: response.id,
                name: dtoVars.name,
                imageKey: response.imageKey,
                imageUrl: imageUrl,
            }

            queryClient.setQueryData<RandomizerCardProps[]>([queryKey], (old = []) => [...old, newRand])
        },
        onError: () => showErrorNotification(new Error('failed to create'))
    })

    const deleteMutation = useMutation({
        mutationFn: (data: Randomizer) => apiDeleteRandomizer(data.id),
        onSuccess: (_, data) => {
            if (!single)
                queryClient.setQueryData<Randomizer[]>([queryKey], (old = []) => 
                    old.filter((rand) => rand.id !== data.id)
            );
        },
        onError: () => showErrorNotification(new Error('failed to delete'))
    })

    const editRandName = async (data: Randomizer, renameValue: string) => {
        await editMutation.mutate({data, editDto: {name: renameValue}})
    }

    const editRandDesc = async (data: Randomizer, descValue: string) => {
        await editMutation.mutate({data, editDto: {description: descValue}})
    }

    const createRand = async (data: CreateRandomizerDto) => {
        if (single) {console.log("data is single randomizer"); return;}
        await createMutation.mutate(data);
    }

    const deleteRand = async (data: Randomizer) => {
        if (single) {console.log("data is single randomizer"); return;}
        await deleteMutation.mutate(data);
    }

    const editRandImage = async (data: RandomizerCardProps, file: File) => {
        if (single) {console.log("data is single randomizer"); return;}

        let imageUrl: string | undefined = undefined;
        const {urlResponse} = await uploadImage(file);
        if (urlResponse.imageKey && file) {
            imageUrl = URL.createObjectURL(file);
        }
        await editMutation.mutate({data, editDto: {imageKey: urlResponse.imageKey, imageUrl: imageUrl}})
    }

    return {editRandName, editRandDesc, createRand, deleteRand, editRandImage}
}
