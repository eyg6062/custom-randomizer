import { Button, Group } from "@mantine/core"
import { BasicTrait } from "../types/trait"
import { TraitOption, TraitOptionEditProps, EditStatus, TraitOptionProps } from "../types/traitOption"
import CustomGrid from "./CustomGrid"
import { useEffect, useState } from "react"
import { getBasicTraitWithOptionImage } from "../api/trait"
import { TraitOptionCard } from "./TraitOptionCard"
import CreateItemButton from "./CreateItemButton"

interface BasicEditSectionProps {
    trait: BasicTrait
}

function BasicEditSection({trait}: BasicEditSectionProps) {
    const [optionData, setOptionData] = useState<TraitOptionEditProps[]>([]);
    const [tempId, setTempId] = useState<number>(0);

    const getTempId = () : string => {
        const result = `tempId:${tempId}`;
        console.log(result)
        setTempId(prev => prev + 1);
        return result;
    }
    
    useEffect(() => {
        console.log("getting trait options");
        getBasicTraitWithOptionImage(trait.id)
            .then(json => {
                const options: TraitOption[] = json.traitOptions;
                const result: TraitOptionEditProps[] = options.map(option => {
                    return {...option, editStatus: EditStatus.Original};
                })
                setOptionData(result);
            })
    }, [trait.id]);


    const handleSave = async () => {

    }

    const handleCreateOption = () => {
        const newOption: TraitOptionEditProps = {id: getTempId(), text: "(add text)", editStatus: EditStatus.New}
        setOptionData(prev => [...prev, newOption]);
    }

    const handleDelete = (selectedOption: TraitOptionProps) => {
        setOptionData(prev => prev.filter(option => option.id !== selectedOption.id));
    }

    const handleDropImage = (file: File, selectedOption: TraitOptionProps) => {
        setOptionData(prev =>
            prev.map(option => {
                if (option.id === selectedOption.id) {
                    const newStatus = option.editStatus === EditStatus.Original ? EditStatus.Edited : option.editStatus;
                    const newOption = {...option, imageUrl: URL.createObjectURL(file), editStatus: newStatus}

                    return newOption;
                }
                return option;
            })
        );
    }

    const handleEditText = (text: string, selectedOption: TraitOptionProps) => {
        setOptionData(prev =>
            prev.map(option => {
                if (option.id === selectedOption.id) {
                    const newStatus = option.editStatus === EditStatus.Original ? EditStatus.Edited : option.editStatus;
                    const newOption = {...option, text: text, editStatus: newStatus}

                    return newOption;
                }
                return option;
            })
        );
    }

    return (
        <>

        <CreateItemButton
            onClick={handleCreateOption}
            toolTipLabel="Add new option"
        />
    
        <CustomGrid
            data={optionData.map(option => ({
                ...option,
                handleDropImage,
                handleEditText,
                handleDelete
            }))}
            Component={TraitOptionCard}
        />

        <Group>
            <Button type="button" onClick={() => window.location.reload()} variant="default">Cancel</Button>
            <Button type="button" onClick={handleSave} variant="default">Save</Button>
        </Group>
        
        
        </>
    )
}

export default BasicEditSection