import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AnyTrait, BasicTrait } from "../types/trait";
import { Group } from "@mantine/core";
import CircleButton from "../components/CircleButton";
import { IconPencil } from "@tabler/icons-react";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/RenameModal";
import { getTrait } from "../api/trait";

export function TraitEditPage () {
    
    const {id} = useParams<{ id: string }>();
    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }

    const [traitData, setTraitData] = useState<BasicTrait>();

    useEffect( () => {
        getTrait(id)
            .then(json => {
                console.log(json)
                setTraitData(json)
            })
    }, []);

    // submit functions
    const handleSubmitTraitRename = async (event: FormEvent<HTMLFormElement>, text: string) => {
        console.log("clicked rename trait");
    }

    // modals
    const renameTraitModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitTraitRename}
    )

    if (!traitData) {
        return null;
    }

    return (
        <>
        
        <p>(Trait option edit view)</p>

            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={() => renameTraitModal.openWithData(traitData)}
                />
                <h1>{traitData.name}</h1>
            </Group>

        </>
    )
}