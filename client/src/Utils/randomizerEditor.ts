import { putRandomizer } from "../api/randomizer";
import { EditRandomizerDto } from "../types/randomizer";

function editRandomizerName(id: string, name: string) {
    const data : EditRandomizerDto = {name: name}
    putRandomizer(id, data);
}

function editRandomizerDescription(id: string, desc: string) {
    const data : EditRandomizerDto = {description: desc}
    putRandomizer(id, data);
}

function editRandomizerImage(id: string, imageUrl: string) {
    const data : EditRandomizerDto = {imageUrl: imageUrl}
    putRandomizer(id, data);
}

function deleteRandomizer(id: string) {
    deleteRandomizer(id);
}

export {editRandomizerName, editRandomizerDescription, editRandomizerImage, deleteRandomizer}