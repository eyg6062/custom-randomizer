import { CreateRandomizerDto, RandomizerCardProps } from "../types/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { Group } from "@mantine/core";
import CreateRandomizerModal, {CreateRandomizerProps} from "../components/CreateRandomizerModal";
import { useCustomModal } from "../hooks/useCustomModal";
import DeleteConfirmModal, { DeleteConfirmProps } from "../components/DeleteConfirmModal";
import CreateItemButton from "../components/CreateItemButton";
import { useDashboard } from "../hooks/useDashboard";
import { ItemType } from "../types/modalProps";
import RenameModal, { RenameModalProps } from "../components/RenameModal";
import EditImageModal, { EditImageProps } from "../components/EditImageModal";

function Dashboard () {
    const {isPending, error, randomizerData, createMutation, deleteMutation, renameMutation, editThumbMutation} = useDashboard();

    const handleCreateSubmit = async (name: string, description: string, image: File | undefined) => {
        const data : CreateRandomizerDto = {
            name: name,
            imageFile: image,
            description: description
        }

        createMutation.mutate(data)
    }

    const handleDelete = async (item: ItemType) => {
        deleteMutation.mutate(item as RandomizerCardProps);
    }

    const handleSubmitRename = async (item: ItemType, renameInput: string) => {
        renameMutation.mutate({data: item as RandomizerCardProps, renameValue: renameInput});
    }

    const handleSubmitEditThumb = async (item: ItemType, imageFile: File | undefined) => {
        editThumbMutation.mutate({data: item as RandomizerCardProps, imageFile: imageFile as File})
    }

    
    // modals
    const createModal = useCustomModal<undefined, CreateRandomizerProps>(
        CreateRandomizerModal, 
        {handleSubmit: handleCreateSubmit}
    );

    const renameModal = useCustomModal<RandomizerCardProps, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRename}
    );

    const editThumbModal = useCustomModal<RandomizerCardProps, EditImageProps>(
        EditImageModal,
        {handleSubmit: handleSubmitEditThumb}
    );

    const deleteConfirmModal = useCustomModal<RandomizerCardProps, DeleteConfirmProps>(
        DeleteConfirmModal,
        {handleSubmit: handleDelete}
    )

    if (error) return <p>error loading dashboard</p>; 
    if (isPending) return <p>loading...</p>; 

    return (
        <>
            <Group>
                <h1>Dashboard</h1>

                <CreateItemButton
                    onClick={createModal.open}
                    toolTipLabel="Create new randomizer"
                />
                
            </Group>
            
            <CustomGrid
                data={randomizerData.map(randomizer => ({
                    ...randomizer,
                    onRenameClick: renameModal.openWithData,
                    onDeleteClick: deleteConfirmModal.openWithData,
                    onEditThumbClick: editThumbModal.openWithData,
                }))}
                Component={RandomizerCardEdit}
            />

            {deleteConfirmModal.modalNode}
            {renameModal.modalNode}
            {editThumbModal.modalNode}
            {createModal.modalNode}

        </>
    )
}

export default Dashboard
