import { Button, Group } from "@mantine/core"
import { BasicTrait } from "../../types/trait"
import { TraitOptionEditProps, EditStatus, TraitOptionProps } from "../../types/traitOption"
import CustomGrid from "../CustomGrid"
import { useState } from "react"
import { TraitOptionCard } from "../TraitOptionCard"
import CreateItemButton from "../CreateItemButton"
import { getPreSignedUrlPutBatch, putImageInBucket } from "../../api/imageUpload"
import { PreSignedUrlResponse } from "../../types/imageUpload"
import { deleteTraitOptions, postTraitOptions, putTraitOptions } from "../../api/traitOption"
import { useTraitOptionData } from "../../hooks/data/useTraitOptionData"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showErrorNotification, showSavedNotification } from "../../Utils/showNotifications"
import { QueryKey } from "../../types/queryKeys"

interface BasicEditSectionProps {
    trait: BasicTrait
}

function BasicEditSection({trait}: BasicEditSectionProps) {
    const [tempId, setTempId] = useState<number>(0);

    const {optionData, setOptionData} = useTraitOptionData(trait.id);
    const queryClient = useQueryClient();

    const getTempId = () : string => {
        const result = `tempId:${tempId}`;
        setTempId(prev => prev + 1);
        return result;
    }

    const saveFn = async () => {
        let updatedOptions = optionData;

        const newImageOptions = updatedOptions.filter((option) => option.file)

        if (newImageOptions.length) {
            // get presigned urls for options with new files
            const preSignedUrlRes: PreSignedUrlResponse[] = await getPreSignedUrlPutBatch(newImageOptions);
            const preSignedUrlDict = new Map(preSignedUrlRes.map(urlRes => [String(urlRes.itemId), urlRes]));

            // upload images
            await Promise.all(newImageOptions.map(imgOption => {
                const url = preSignedUrlDict.get(String(imgOption.id))?.url;
                putImageInBucket(imgOption.file as File, url as string)
            }));

            // set image keys to corresponding option
            updatedOptions = updatedOptions.map(option => {
                if (preSignedUrlDict.has(String(option.id))) {
                    return {...option, imageKey: preSignedUrlDict.get(String(option.id))?.imageKey}
                }
                return option;
            })
        }
        
        const edited = []
        const created = []
        const deleted = []

        for (const option of updatedOptions) {
            switch (option.editStatus) {
                case EditStatus.Edited:
                    edited.push(option);
                    break;
                case EditStatus.New:
                    created.push(option);
                    break;
                case EditStatus.Deleted:
                    deleted.push(option);
            }
        };
        
        if (edited.length) await putTraitOptions(edited);
        if (created.length) await postTraitOptions(trait.id, created);
        if (deleted.length) await deleteTraitOptions(deleted);
    }

    const saveMutation = useMutation({
        mutationFn: saveFn,
        onSuccess: showSavedNotification,
        onError: () => showErrorNotification(Error("failed to save"))
    })

    const handleSave = async () => {
        saveMutation.mutateAsync();
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

    const handleCancel = async () => {
        await queryClient.invalidateQueries({ queryKey: [QueryKey.TraitOptionData] })
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
            <Button type="button" onClick={handleCancel} variant="default">Cancel</Button>
            <Button type="button" onClick={handleSave} variant="default">Save</Button>
        </Group>

        </>
    )
}

export default BasicEditSection