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
import { useTraitRandomizer } from "../hooks/useTraitRandomizer";
import { useSingleRandomizerData } from "../hooks/data/useSingleRandomizerData";
import { useParams } from "react-router";
import { useRandomizerEditor } from "../hooks/useRandomizerEditor";
import { useTraitEditor } from "../hooks/useTraitEditor";
import { QueryKey } from "../types/queryKeys";
import { useTraitData } from "../hooks/data/useTraitData";
import { LoadingIndicator } from "../components/LoadingIndicator";

function RandomizerSection ({id}: {id: string}) {
    const {isFetching, error, randomizerData} = useSingleRandomizerData(id);
    
    const {editRandName, editRandDesc} = useRandomizerEditor(QueryKey.SingleRandomizerData, true);
    
    const handleSubmitRandRename = async (item: ItemType, renameValue: string) => {
        editRandName(item as Randomizer, renameValue);
    }

    const handleSubmitEditDesc = async (item: ItemType, descValue: string) => {
        editRandDesc(item as Randomizer, descValue);
    }

    const renameRandModal = useCustomModal<RandomizerCardProps, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRandRename}
    )

    const editDescModal = useCustomModal<RandomizerCardProps, EditDescModalProps>(
        EditDescModal,
        {handleSubmit: handleSubmitEditDesc}
    )

    if (error) throw new Error(); 
    if (!randomizerData) return null;
    const pageContent = (
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

            {renameRandModal.modalNode}
            {editDescModal.modalNode}
        </>
    )

    return isFetching ? <LoadingIndicator/> : pageContent;
}

function TraitsSection ({id}: {id: string}) {
    const {isFetching, error, traitData} = useTraitData(id);
    const {
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
    } = useTraitRandomizer();
    const {createTrait, editTraitName, deleteTrait} = useTraitEditor(QueryKey.TraitData, false)

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

    if (!traitData) {return null;}
    if (error) throw new Error();    
    const pageContent = (
        <>
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

            {createModal.modalNode}
            {renameTraitModal.modalNode}
            {deleteConfirmModal.modalNode}
        </>
    )

    return isFetching ? <LoadingIndicator/> : pageContent;
}

function RandomizerEditPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    return (
        <>
            <RandomizerSection id={id} />
            <TraitsSection id={id} />
        </>
    )
}

export default RandomizerEditPage
