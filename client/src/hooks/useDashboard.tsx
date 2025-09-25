import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRandomizersData } from "./useRandomizersData";
import { apiDeleteRandomizer } from "../api/randomizer";
import { CreateRandomizerDto, RandomizerCardProps } from "../types/randomizer";
import { showErrorNotification } from "../Utils/showErrorNotification";
import { createRandomizer, editRandomizerImage, editRandomizerName } from "../Utils/randomizerEditor";

export function useDashboard() {
    const queryClient = useQueryClient();

    const {isPending, error, randomizerData} = useRandomizersData();

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

            queryClient.setQueryData<RandomizerCardProps[]>(["randomizerData"], (old = []) => [...old, newRand])

        }
    })

    const deleteMutation = useMutation({
        mutationFn: (data: RandomizerCardProps) => apiDeleteRandomizer(data.id),
        onSuccess: (_, randVars) => {
            queryClient.setQueryData<RandomizerCardProps[]>(["randomizerData"], (old = []) => 
                old.filter((rand) => rand.id !== randVars.id)
            );
        },
        onError: () => showErrorNotification(new Error('failed to delete'))
    })

    const renameMutation = useMutation({
        mutationFn: ({ data, renameValue }: { data: RandomizerCardProps; renameValue: string }) => editRandomizerName(data.id, renameValue),
        onSuccess: (_, {data, renameValue}) => {
            queryClient.setQueryData<RandomizerCardProps[]>(["randomizerData"], (old = []) => 
                old.map(rand => rand.id === data.id ? { ...rand, name: renameValue} : rand)
            )
        }
    })

    const editThumbMutation = useMutation({
        mutationFn: ({ data, imageFile }: { data: RandomizerCardProps; imageFile: File }) => editRandomizerImage(data.id, imageFile),
        onSuccess: (response, {data, imageFile}) => {
            let imageUrl: string;
            if (response.imageKey && imageFile) {
                imageUrl = URL.createObjectURL(imageFile);
            }
            queryClient.setQueryData<RandomizerCardProps[]>(["randomizerData"], (old = []) => 
                old.map(rand => rand.id === data.id ? { ...rand, imageKey: response.imageKey, imageUrl: imageUrl} : rand)
            )
        }
    })
    

    return {isPending, error, randomizerData, createMutation, deleteMutation, renameMutation, editThumbMutation};
}