import { putTrait } from "../api/trait";
import { EditTraitDto } from "../types/trait";

async function editTraitName(id: string, name: string) {
    const data: EditTraitDto = {name: name};
    await putTrait(id, data);
}

export {editTraitName}