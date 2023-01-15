import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
    type ActionArgs,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    FormData,
    writeAsyncIterableToWritable,
} from "@remix-run/node";
import {
    json,
    unstable_parseMultipartFormData as parseMultipartFormData,
    unstable_composeUploadHandlers as composeUploadHandlers,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { WriteStream } from "fs";
import { PassThrough, Readable, Transform, Writable } from "stream";
import { S3, s3UploadHandler, uploadStreamToS3 } from "~/utils/s3.server";

export async function action({ request }: ActionArgs) {
    const contentLength = request.headers.get("Content-Length");
    console.log(contentLength);

    // * testing S3 Client
    // console.log(await S3.send(new ListBucketsCommand("")));
    // * testing s3 PutObjectCommand
    // await S3.send(
    //     new PutObjectCommand({
    //         Bucket: "sagamedia",
    //         Key: "test/file.png",
    //     })
    // );
    // ? How to extract binary data from file upload?
    async function uploadHandler(info: {
        name: string;
        filename?: string;
        contentType: string;
        data: AsyncIterable<Uint8Array>;
    }) {
        // * in here you would handle file upload
        // ? but how do we upload our file to R2?
        console.log(info.data);
        let pass = new PassThrough();

        // async function createStream() {
        //     const writeStream = new PassThrough();
        //     await writeAsyncIterableToWritable(info.data, writeStream);
        //     return writeStream;
        // }

        // const finalStream = await createStream();
        // console.dir(finalStream, { depth: 0 });

        await S3.send(
            new PutObjectCommand({
                Bucket: "sagamedia",
                Key: "file.avif",
                Body: pass,
                ContentType: "image/avif",
                ContentLength: Number(contentLength),
            })
        );
        await writeAsyncIterableToWritable(info.data, pass);
        // * and return the R2 URL
        return "zumba";
    }
    const formData = await parseMultipartFormData(request, uploadHandler);

    // console.log(formData.get("img"));
    return {};
}

export default function Upload() {
    const fetcher = useFetcher();
    return (
        <main className="mbs-l">
            <article className="center stack">
                <h2 className="text-2">File Upload</h2>
                <fetcher.Form method="post" encType="multipart/form-data">
                    <fieldset className="stack">
                        <label htmlFor="img-field">Image to upload</label>
                        <input
                            id="img-field"
                            type="file"
                            name="img"
                            accept="image/*"
                            // multiple
                        />
                        <label htmlFor="img-desc">Image description</label>
                        <input id="img-desc" type="text" name="desc" />
                        <button type="submit">Upload to S3</button>
                    </fieldset>
                </fetcher.Form>
            </article>
        </main>
    );
}
