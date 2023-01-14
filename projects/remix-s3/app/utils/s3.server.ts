import {
    type PutObjectCommandInput,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import {
    type UploadHandler,
    writeAsyncIterableToWritable,
} from "@remix-run/node";
import { PassThrough } from "stream";

const R2_ENDPOINT = process.env["R2_ENDPOINT"];
const R2_ACCESS_KEY = process.env["R2_ACCESS_KEY"];
const R2_SECRET_KEY = process.env["R2_SECRET_KEY"];

if (!(R2_ENDPOINT && R2_ACCESS_KEY && R2_SECRET_KEY)) {
    throw new Error("Storage is missing required configuration");
}

const S3 = new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY,
    },
});

async function uploadStreamToS3(
    data: any,
    filename: string,
    contentType: string
) {
    const stream = uploadStream({
        Key: filename,
        ContentType: contentType,
    });
    await writeAsyncIterableToWritable(data, stream.writeStream);
    const file = await stream.promise;
    return file.Location;
}

const s3UploadHandler: UploadHandler = async ({
    name,
    filename,
    data,
    contentType,
}) => {
    if (name !== "img") {
        return undefined;
    }
    const uploadedFileLocation = await uploadStreamToS3(
        data,
        filename!,
        contentType
    );
    return uploadedFileLocation;
};

export { S3, uploadStreamToS3, s3UploadHandler };
