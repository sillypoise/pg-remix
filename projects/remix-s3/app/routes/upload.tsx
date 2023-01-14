import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
    type ActionArgs,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    type UploadHandler,
    FormData,
    writeAsyncIterableToWritable,
} from "@remix-run/node";
import {
    json,
    unstable_parseMultipartFormData as parseMultipartFormData,
    unstable_composeUploadHandlers as composeUploadHandlers,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { PassThrough } from "stream";
import { S3, s3UploadHandler, uploadStreamToS3 } from "~/utils/s3.server";

export async function action({ request }: ActionArgs) {
    // console.log(await S3.send(new ListBucketsCommand("")));
    await S3.send(
        new PutObjectCommand({
            Bucket: "sagamedia",
            Key: "test/file.png",
        })
    );
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
