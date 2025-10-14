import { Button, Fieldset, Group, NumberInput } from "@mantine/core"
import { FormEvent, useState } from "react";
import { EditNumberTraitDto, NumberTrait } from "../../types/trait";
import { putTrait } from "../../api/trait";
import { QueryKey } from "../../types/queryKeys";
import { useEditMutation } from "../../hooks/itemMutations";

interface NumberEditSectionProps {
    trait: NumberTrait
}

function NumberEditSection({trait}: NumberEditSectionProps) {
    const [minInput, setMinInput] = useState<string | number>(trait.minNum);
    const [maxInput, setMaxInput] = useState<string | number>(trait.maxNum);

    const editMutation = useEditMutation<NumberTrait, EditNumberTraitDto>(QueryKey.SingleTraitData, true, putTrait);

    const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        const dto: EditNumberTraitDto = {
            traitType: trait.traitType, 
            randomizerId: trait.randomizerId, 
            minNum: minInput as number, 
            maxNum: maxInput as number
        }
        await editMutation.mutateAsync({data: trait, editDto: dto})
        console.log('updated trait');
    }

    return (
        <>
        <Fieldset>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <Group>
                    <NumberInput
                        label="Min number"
                        value={minInput}
                        onChange={setMinInput}
                    />

                    <NumberInput
                        label="Max number"
                        value={maxInput}
                        onChange={setMaxInput}
                    />
                </Group>

                <Button type="submit" variant="default">Save</Button>
            </form>
        </Fieldset>
        </>
    )
}

export default NumberEditSection