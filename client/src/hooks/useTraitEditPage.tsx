import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AnyTrait } from "../types/trait";
import { getTrait } from "../api/trait";
import { Group } from "@mantine/core";
import CircleButton from "../components/CircleButton";
import { IconPencil } from "@tabler/icons-react";
import { useCustomModal } from "./useCustomModal";
import { RandomizerCardProps } from "../types/randomizer";
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


    const handleSubmitRename = async (event: FormEvent<HTMLFormElement>, text: string) => {
        event.preventDefault();
        const save = traitData;

        setTraitData()

        try {
            await editRandomizerName(selectedCard.id, renameInput);
            setRandomizerData(prev => 
                prev.map(randomizer => {
                    if (randomizer.id === selectedCard.id) {
                        console.log("editing name");
                        return {...randomizer, name: renameInput};
                    }
                    else {
                        return randomizer;
                    }
                })
            );

        } catch (error) {
            console.error(`Failed to rename randomizer ${selectedCard.id}:`, error);
        }

        renameModal.close();
    }

    const renameModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRename}
    );

    if (!traitData) return null;

    const pageNode = (
        <>
        
        <p>(Trait option edit view)</p>
        
        <Group>
            <CircleButton
                icon={IconPencil}
                onClick={() => renameModal.openWithData}
            />
            <h1>{traitData.name}</h1>
        </Group>

        </>
    )

    return {traitData, pageNode}
}