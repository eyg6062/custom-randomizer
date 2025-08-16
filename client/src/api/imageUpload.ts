import { BASE_URL, apiFetch } from "./client";

const REQUEST_URL : string = `${BASE_URL}ImageUpload`

export async function uploadImageToBucket(file: File) {
    // get presigned url from server
    const response = await getPreSignedUrl(file.name, file.type);

    console.log(`uploadImageToBucket response: ${response}`)
    const presignedUrl = response.url;

    // upload image to s3 using url
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file
    };

    const s3Url = presignedUrl.split("?")[0];
    console.log("File uploading to:", s3Url);

    return apiFetch(presignedUrl, options);
}

export async function getPreSignedUrl(filename: string, contentType: string) {
    
    const params = new URLSearchParams({
        fileName: filename,
        contentType: contentType,
    });

    return apiFetch(`${REQUEST_URL}/PreSignedUrl?${params.toString()}`)
}
