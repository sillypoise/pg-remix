import { PutObjectCommand } from "@aws-sdk/client-s3";
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
import { s3, s3UploadHandler, uploadStreamToS3 } from "~/utils/s3.server";

export async function action({ request }: ActionArgs) {
    let contentType = request.headers.get("Content-Type") || "";
    let [type, boundary] = contentType.split(/\s*;\s*boundary=/);

    let parts: AsyncIterable;

    // console.log(request.body);
    // function uploadHandler(info) {
    //     console.log(info);
    // }
    // const formData = await parseMultipartFormData(request, uploadHandler);

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