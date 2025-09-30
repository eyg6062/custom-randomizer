import { useParams } from "react-router";
import BasicEditSection from "../components/page-sections/BasicEditSection";
import NumberEditSection from "../components/page-sections/NumberEditSection";
import { useSingleTraitData } from "../hooks/data/useSingleTraitData";
import { AnyTrait, BasicTrait, NumberTrait } from "../types/trait";
import { TraitType } from "../types/traitType";
import { useTraitEditor } from "../hooks/useTraitEditor";
import { QueryKey } from "../types/queryKeys";
import { ItemType } from "../types/modalProps";
import { Group } from "@mantine/core";
import CircleButton from "../components/CircleButton";
import { IconPencil } from "@tabler/icons-react";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/modals/RenameModal";

export function TraitEditPage () {
    const {id: traitId} = useParams<{ id: string }>();
    if (traitId === undefined) throw new Error("Missing route parameter: id");

    const {singleTraitData: traitData} = useSingleTraitData(traitId);
    const {editTraitName} = useTraitEditor(QueryKey.SingleTraitData, true);

    const handleSubmitRename = async (item: ItemType, renameInput: string) => {
        const traitItem = item as AnyTrait;
        await editTraitName(traitItem, renameInput);
    };
    
    const renameModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRename}
    );

    if (!traitData) return null;

    const renderTraitSection = () => {
        switch (traitData.traitType) {
            case TraitType.Number:
                return <NumberEditSection trait={traitData as NumberTrait} />;
            case TraitType.Basic:
                return <BasicEditSection trait={traitData as BasicTrait}/>;
            default:
                return null;
        }
    }

    const pageContent = (
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

    return (
        <>
        {pageContent}
        {renderTraitSection()}
        </>
    )
}