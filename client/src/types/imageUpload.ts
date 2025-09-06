interface PreSignedUrlResponse {
    itemId: string,
    imageKey: string,
    url: string
}

interface PreSignedUrlPutBatchDto {
    itemId: string,
    fileName?: string,
    contentType?: string
}

export type {PreSignedUrlResponse, PreSignedUrlPutBatchDto}