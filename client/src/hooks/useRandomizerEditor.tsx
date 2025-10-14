import { CreateRandomizerCardDto, CreateRandomizerDto, EditRandomizerCardDto, Randomizer, RandomizerCardProps } from "../types/randomizer";
import { apiDeleteRandomizer, postRandomizer, putRandomizer } from "../api/randomizer";
import { uploadImage } from "../api/imageUpload";
import { useCreateMutation, useDeleteMutation, useEditMutation } from "./itemMutations";

export function useRandomizerEditor(queryKey: string, single: boolean) {
    const editMutation = useEditMutation<RandomizerCardProps, EditRandomizerCardDto>(queryKey, single, putRandomizer);
    const deleteMutation = useDeleteMutation<Randomizer>(queryKey, single, apiDeleteRandomizer);
    const createMutation = useCreateMutation<RandomizerCardProps, CreateRandomizerCardDto>(queryKey, single, postRandomizer);

    const editRandName = async (data: Randomizer, renameValue: string) => {
        await editMutation.mutateAsync({data, editDto: {name: renameValue}});
    }

    const editRandDesc = async (data: Randomizer, descValue: string) => {
        await editMutation.mutateAsync({data, editDto: {description: descValue}})
    }

    const createRand = async (data: CreateRandomizerDto, imageFile: File | undefined) => {
        if (single) {console.log("data is single randomizer"); return;}
        let dto: CreateRandomizerCardDto = {...data};

        if (imageFile) {
            const {urlResponse} = await uploadImage(imageFile);
            dto = {...dto, imageUrl: URL.createObjectURL(imageFile), imageKey: urlResponse.imageKey}
        }
        
        await createMutation.mutate({dto});
    }

    const deleteRand = async (data: Randomizer) => {
        if (single) {console.log("data is single randomizer"); return;}
        await deleteMutation.mutateAsync({data});
    }

    const editRandImage = async (data: RandomizerCardProps, file: File) => {
        if (single) {console.log("data is single randomizer"); return;}

        let imageUrl: string | undefined = undefined;
        const {urlResponse} = await uploadImage(file);
        if (urlResponse.imageKey && file) {
            imageUrl = URL.createObjectURL(file);
        }
        await editMutation.mutateAsync({data, editDto: {imageKey: urlResponse.imageKey, imageUrl: imageUrl}})
    }

    return {editRandName, editRandDesc, createRand, deleteRand, editRandImage}
}
