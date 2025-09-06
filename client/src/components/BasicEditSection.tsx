import { Button, Group } from "@mantine/core"
import { BasicTrait } from "../types/trait"
import { TraitOption, TraitOptionEditProps, EditStatus, TraitOptionProps } from "../types/traitOption"
import CustomGrid from "./CustomGrid"
import { useEffect, useState } from "react"
import { getBasicTraitWithOptionImage } from "../api/trait"
import { TraitOptionCard } from "./TraitOptionCard"
import CreateItemButton from "./CreateItemButton"
import { getPreSignedUrlPutBatch, putImageInBucket } from "../api/imageUpload"
import { PreSignedUrlResponse } from "../types/imageUpload"
import { putTraitOptions } from "../api/traitOption"

interface BasicEditSectionProps {
    trait: BasicTrait
}

function BasicEditSection({trait}: BasicEditSectionProps) {
    const [optionData, setOptionData] = useState<TraitOptionEditProps[]>([]);
    const [tempId, setTempId] = useState<number>(0);

    const getTempId = () : string => {
        const result = `tempId:${tempId}`;
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
        let editedOptionData = optionData;

        const newImageOptions = [];
        for (const option of optionData) {
            if (option.file) newImageOptions.push(option) 
        };

        if (newImageOptions.length) {
            // get presigned urls for options with new files
            const preSignedUrlRes: PreSignedUrlResponse[] = await getPreSignedUrlPutBatch(newImageOptions);
            const preSignedUrlDict = new Map(preSignedUrlRes.map(urlRes => [String(urlRes.itemId), urlRes]));

            // upload images
            Promise.all(newImageOptions.map(imgOption => {
                const url = preSignedUrlDict.get(String(imgOption.id))?.url;
                putImageInBucket(imgOption.file as File, url as string)
            }));

            // set image keys to corresponding option
            editedOptionData = editedOptionData.map(option => {
                if (preSignedUrlDict.has(String(option.id))) {
                    return {...option, imageKey: preSignedUrlDict.get(String(option.id))?.imageKey}
                }
                return option;
            })
        }
        
        const editedOptions = []
        const newOptions = []
        const deletedOptions = []

        for (const option of editedOptionData) {
            if (option.editStatus === EditStatus.Edited) {
                editedOptions.push(option);
            } 
            else if (option.editStatus === EditStatus.New) {
                newOptions.push(option);
            }
            else if (option.editStatus === EditStatus.Deleted) {
                deletedOptions.push(option);
            }
        }
        
        const putResponse = await putTraitOptions(editedOptions);
        
        console.log("Saved!")
    }

    const handleCreateOption = () => {
        const newOption: TraitOptionEditProps = {id: getTempId(), text: "(Enter text)", editStatus: EditStatus.New}
        setOptionData(prev => [...prev, newOption]);
    }

    const handleDelete = (selectedOption: TraitOptionProps) => {
        setOptionData(prev =>
            prev
            .filter(option => !(option.id === selectedOption.id && option.editStatus === EditStatus.New))
            .map(option =>
                option.id === selectedOption.id
                ? { ...option, editStatus: EditStatus.Deleted }
                : option
            )
        );
    }

    const handleDropImage = (file: File, selectedOption: TraitOptionProps) => {
        setOptionData(prev =>
            prev.map(option => {
                if (option.id === selectedOption.id) {
                    const newStatus = option.editStatus === EditStatus.Original ? EditStatus.Edited : option.editStatus;
                    const newOption = {...option, imageUrl: URL.createObjectURL(file), file: file, editStatus: newStatus}

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
            data={optionData.filter(option => option.editStatus !== EditStatus.Deleted)
                .map(option => ({
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