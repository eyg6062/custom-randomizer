import { BASE_URL, apiFetch } from "./client";

const REQUEST_URL : string = `${BASE_URL}ImageUpload`

export async function uploadImage(file: File) {
    // get presigned url from server
    const response = await getPreSignedUrlPut(file);
    const presignedUrl = response.url;

    return putImageInBucket(file, presignedUrl);
}

export async function putImageInBucket(file: File, presignedUrl: string) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file
    };

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

