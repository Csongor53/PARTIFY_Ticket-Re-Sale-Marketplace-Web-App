import {BlobServiceClient} from "@azure/storage-blob";
import fs from 'fs'

export const uploadToBlobStream = async (file) => {
    const AZURE_STORAGE_CONNECTION_STRING =
        process.env.AZURE_STORAGE_CONNECTION_STRING
    const CONTAINER_NAME = process.env.BLOB_STORAGE_NAME

// Create a BlobServiceClient object
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

// Get a reference to a blob
    const extension = file.originalFilename.split(".").pop();
    const blobName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

// Create a read stream from the file path "C:\\Users\\User\\AppData\\Local\\Temp\\3054389bbca1b1c2ffe71d800"
    const readStream = fs.createReadStream(file.filepath);

// Upload the file to Azure Blob Storage
    blockBlobClient.uploadStream(readStream, undefined, undefined, {blobHTTPHeaders: {blobContentType: file.mimetype}})
        .then(response => {
            console.log(`Upload successful. File URL: ${blockBlobClient.url}`);
        })
        .catch(error => {
            console.log(error);
        });
    return blockBlobClient.url
}