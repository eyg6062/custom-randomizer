import { useParams } from "react-router";
import { AnyTrait, EditTraitDto } from "../types/trait";
import { getTrait, putTrait } from "../api/trait";
import { Group } from "@mantine/core";
import CircleButton from "../components/CircleButton";
import { IconPencil } from "@tabler/icons-react";
import { useCustomModal } from "./useCustomModal";
import RenameModal, { RenameModalProps } from "../components/modals/RenameModal";
import { ItemType } from "../types/modalProps";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorNotification } from "../Utils/showNotifications";

export function useTraitEditPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    const queryClient = useQueryClient();

    const { isPending, error, data: traitData } = useQuery<AnyTrait>({
        queryKey: ['singleTraitData', id],
        queryFn: () => getTrait(id),
    })

    const renameMutation = useMutation({
        mutationFn: ({ data, editedTrait }: { data: AnyTrait; editedTrait: EditTraitDto }) => putTrait(data.id, editedTrait),
        onSuccess: (_, {data, editedTrait}) => {
            queryClient.setQueryData<AnyTrait>(["singleTraitData"], {...data, name: editedTrait.name as string} )
        },
        onError: () => showErrorNotification(new Error('failed to rename')),
    })

    const handleSubmitRename = async (item: ItemType, renameInput: string) => {
        const traitItem = item as AnyTrait;
        renameMutation.mutate({data: item as AnyTrait, editedTrait: {...traitItem, name: renameInput}});
    };

    const renameModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRename}
    );

    const traitPageNode = (
        <>
        
        <p>(Trait option edit view)</p>
        
        <Group>
            <CircleButton
                icon={IconPencil}
                onClick={() => {
                    traitData ? renameModal.openWithData(traitData) : console.log("no trait data");
                }}
            />
            <h1>{traitData ? traitData.name : null}</h1>
        </Group>

        {renameModal.modalNode}

        </>
    )

    return {
        traitData, 
        traitPageNode,
        isPending,
        error
    };
}