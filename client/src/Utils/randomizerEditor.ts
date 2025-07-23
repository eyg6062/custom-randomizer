import { putRandomizer } from "../api/randomizer";
import { EditRandomizerDto } from "../types/randomizer";

async function editRandomizerName(id: string, name: string) {
    const data : EditRandomizerDto = {name: name}
    await putRandomizer(id, data);
}

async function editRandomizerDescription(id: string, desc: string) {
    const data : EditRandomizerDto = {description: desc}
    await putRandomizer(id, data);
}

async function editRandomizerImage(id: string, imageUrl: string) {
    const data : EditRandomizerDto = {imageUrl: imageUrl}
    await putRandomizer(id, data);
}

export {editRandomizerName, editRandomizerDescription, editRandomizerImage}