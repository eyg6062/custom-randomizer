import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AnyTrait, EditTraitDto } from "../types/trait";
import { getTrait, putTrait } from "../api/trait";
import { Group } from "@mantine/core";
import CircleButton from "../components/CircleButton";
import { IconPencil } from "@tabler/icons-react";
import { useCustomModal } from "./useCustomModal";
import RenameModal, { RenameModalProps } from "../components/RenameModal";

export function useTraitEditPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }

    const [traitData, setTraitData] = useState<AnyTrait>();

    useEffect( () => {
        getTrait(id)
            .then(json => setTraitData(json))
    }, [] );


    const handleSubmitRename = async (event: FormEvent<HTMLFormElement>, renameInput: string) => {
        event.preventDefault();

        if (!traitData) {
            console.log("no trait data");
            return;
        }

        const save = traitData;

        setTraitData({...traitData, name: renameInput})

        try {
            const data: EditTraitDto = {traitType: traitData.traitType, name: renameInput}
            await putTrait(traitData.id, data);

        } catch (error) {
            setTraitData(save)
            console.error(`Failed to rename trait:`, error);
        }

        renameModal.close();
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
        setTraitData, 
        traitPageNode
    };
}