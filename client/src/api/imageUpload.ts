import { PreSignedUrlPutBatchDto } from "../types/imageUpload";
import { TraitOptionEditProps } from "../types/traitOption";
import { BASE_URL, apiFetch } from "./client";

const REQUEST_URL : string = `${BASE_URL}ImageUpload`

export async function uploadImage(file: File) {
    // get presigned url from server
    const urlResponse = await getPreSignedUrlPut(file);
    const presignedUrl = urlResponse.url;

    const bucketResponse = await putImageInBucket(file, presignedUrl);
    return {urlResponse, bucketResponse}
}

export async function putImageInBucket(file: File, presignedUrl: string) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file
    };
    console.log("putImageInBucket")

    return apiFetch(presignedUrl, options);
}

export async function getImageUrl(imageKey: string) {
    const params = new URLSearchParams({
        imageKey: imageKey
    });

    return apiFetch(`${REQUEST_URL}/PreSignedUrlGet?${params.toString()}`)
}

export async function getPreSignedUrlPut(file: File) {
    
    const params = new URLSearchParams({
        fileName: file.name,
        contentType: file.type,
    });

    return apiFetch(`${REQUEST_URL}/PreSignedUrlPut?${params.toString()}`)
}

export async function getPreSignedUrlPutBatch(traitOptions: TraitOptionEditProps[]) {
    
    var data: PreSignedUrlPutBatchDto[] = traitOptions.map(option => ({
        itemId: String(option.id), 
        fileName: option.file?.name, 
        contentType: option.file?.type
    }));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return apiFetch(`${REQUEST_URL}/PreSignedUrlPut/Batch`, options)
}

