import { getPreSignedUrlPut, putImageInBucket} from "../api/imageUpload";
import { postRandomizer, putRandomizer } from "../api/randomizer";
import { EditRandomizerDto, CreateRandomizerDto } from "../types/randomizer";

async function createRandomizer({name, imageFile, description} : CreateRandomizerDto) {
    // upload image
    let imageKey;
    if (imageFile) {
        const response = await getPreSignedUrlPut(imageFile);
        imageKey = response.imageKey;

        putImageInBucket(imageFile, response.url);
    }

    // post randomizer
    const data = {name: name, imageKey: imageKey, description: description};
    return await postRandomizer(data);
}

async function editRandomizerName(id: string, name: string) {
    const data : EditRandomizerDto = {name: name}
    await putRandomizer(id, data);
}

async function editRandomizerDescription(id: string, desc: string) {
    const data : EditRandomizerDto = {description: desc}
    await putRandomizer(id, data);
}

async function editRandomizerImage(id: string, file: File) {
    //const data : EditRandomizerDto = {imageUrl: imageUrl}
    //await putRandomizer(id, data);
}

export {editRandomizerName, editRandomizerDescription, editRandomizerImage, createRandomizer}