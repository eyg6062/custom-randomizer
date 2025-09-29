import { getPreSignedUrlPut, putImageInBucket} from "../api/imageUpload";
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

async function editRandomizerImage(id: string, file: File) {
    const response = await getPreSignedUrlPut(file);
    const presignedUrl = response.url;
    const imageKey = response.imageKey;

    putImageInBucket(file, presignedUrl);

    const data : EditRandomizerDto = {imageKey: imageKey}
    return await putRandomizer(id, data);
}

export {editRandomizerName, editRandomizerDescription, editRandomizerImage}