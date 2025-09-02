import { Button, Fieldset, Group, NumberInput } from "@mantine/core"
import { FormEvent, useState } from "react";
import { EditNumberTraitDto, NumberTrait } from "../types/trait";
import { putTrait } from "../api/trait";

interface NumberEditSectionProps {
    trait: NumberTrait
}

function NumberEditSection({trait}: NumberEditSectionProps) {
    const [minInput, setMinInput] = useState<string | number>(trait.minNum);
    const [maxInput, setMaxInput] = useState<string | number>(trait.maxNum);

    const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        try {
            const data: EditNumberTraitDto = {traitType: trait.traitType, minNum: minInput as number, maxNum: maxInput as number}
            await putTrait(trait.id, data);

            console.log('updated trait');
        }
        catch (error) {
            console.error(`Failed to update trait:`, error);
        }
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