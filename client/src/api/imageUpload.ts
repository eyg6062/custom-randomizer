import { BASE_URL, apiFetch } from "./client";

const REQUEST_URL : string = `${BASE_URL}ImageUpload`

export async function uploadImageToBucket(file: File) {
    // get presigned url from server
    const response = await getPreSignedUrlPut(file.name, file.type);
    const presignedUrl = response.url;

    // upload image to s3 using url
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

export async function getPreSignedUrlPut(filename: string, contentType: string) {
    
    const params = new URLSearchParams({
        fileName: filename,
        contentType: contentType,
    });

    return apiFetch(`${REQUEST_URL}/PreSignedUrlPut?${params.toString()}`)
}

