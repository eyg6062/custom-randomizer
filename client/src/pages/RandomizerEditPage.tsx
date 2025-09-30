import { Button, Group } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { AnyTrait } from "../types/trait";
import { IconPencil } from "@tabler/icons-react";
import CircleButton from "../components/CircleButton";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/modals/RenameModal";
import CreateTraitModal, { CreateTraitProps, ModalCreateAnyTraitDto } from "../components/modals/CreateTraitModal";
import DeleteConfirmModal, { DeleteConfirmProps } from "../components/modals/DeleteConfirmModal";
import { Randomizer, RandomizerCardProps } from "../types/randomizer";
import EditDescModal, { EditDescModalProps } from "../components/modals/EditDescModal";
import CreateItemButton from "../components/CreateItemButton";
import { ItemType } from "../types/modalProps";
import { useTraitRandomizer } from "../hooks/useRandomizerPageTraitData";
import { useSingleRandomizerData } from "../hooks/useSingleRandomizerData";
import { useParams } from "react-router";
import { useRandomizerEditor } from "../hooks/useRandomizerEditor";
import { useTraitEditor } from "../hooks/useTraitEditor";
import { QueryKey } from "../types/queryKeys";
import { useTraitData } from "../hooks/useTraitData";

function RandomizerEditPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    const {
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
    } = useTraitRandomizer();
    
    const {randomizerData} = useSingleRandomizerData(id);
    const {traitData} = useTraitData(id);
    const {editRandName, editRandDesc} = useRandomizerEditor(QueryKey.SingleRandomizerData, true);
    const {createTrait, editTraitName, deleteTrait} = useTraitEditor(QueryKey.TraitData, false)

    const handleSubmitRandRename = async (item: ItemType, renameValue: string) => {
        editRandName(item as Randomizer, renameValue);
    }

    const handleSubmitEditDesc = async (item: ItemType, descValue: string) => {
        editRandDesc(item as Randomizer, descValue);
    }

    const handleSubmitCreate = async (data: ModalCreateAnyTraitDto) => {
        const createData = {...data, randomizerId: id};
        console.log(createData);
        await createTrait(createData);
    }

    const handleSubmitTraitRename = async (item: ItemType, renameInput: string) => {        
        const selectedTrait = item as AnyTrait;
        await editTraitName(selectedTrait, renameInput);
    }

    const handleDelete = async (item: ItemType) => {
        const selectedTrait = item as AnyTrait;
        await deleteTrait(selectedTrait);
    }


    const renameRandModal = useCustomModal<RandomizerCardProps, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRandRename}
    )

    const editDescModal = useCustomModal<RandomizerCardProps, EditDescModalProps>(
        EditDescModal,
        {handleSubmit: handleSubmitEditDesc}
    )

    const createModal =  useCustomModal<undefined, CreateTraitProps>(
        CreateTraitModal,
        {handleSubmit: handleSubmitCreate}
    )

    const renameTraitModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitTraitRename}
    )

    const deleteConfirmModal = useCustomModal<AnyTrait, DeleteConfirmProps>(
        DeleteConfirmModal,
        {handleSubmit: handleDelete}
    )


    if (!randomizerData || !traitData ) return null;

    return (
        <>
            <p>(edit view)</p>
            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={() => renameRandModal.openWithData(randomizerData)}
                />
                <h1>{randomizerData.name}</h1>
            </Group>

            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={() => editDescModal.openWithData(randomizerData)}
                />
                <p>{randomizerData.description || "(description)"}</p>
            </Group>
            
            <CreateItemButton
                onClick={createModal.open}
                toolTipLabel="Create new trait"
            />
            
            <CustomGrid 
                data={traitData.map(trait => ({
                    ...trait,
                    onCardClick: handleUpdateTraitCard,
                    onRenameClick: renameTraitModal.openWithData,
                    onDeleteClick: deleteConfirmModal.openWithData,
                }))}
                Component={TraitCardEdit}
            />

            <Group justify="center">
                <Button onClick={randomizeAllCards} variant="default">
                    Randomize All
                </Button>

                <Button onClick={clearAllCards} variant="default">
                    Clear All
                </Button>
            </Group>

            {renameRandModal.modalNode}
            {editDescModal.modalNode}
            {createModal.modalNode}
            {renameTraitModal.modalNode}
            {deleteConfirmModal.modalNode}

        </>
    )
}

export default RandomizerEditPage
