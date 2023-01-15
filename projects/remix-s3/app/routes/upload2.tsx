import { PutObjectCommand } from "@aws-sdk/client-s3";
import { type ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { S3 } from "~/utils/s3.server";

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const image = formData.get("img") as File | null;
    const formValues = Object.fromEntries(formData);
    const arrBuff = await image?.arrayBuffer();
    const buffer = Buffer.from(arrBuff!);

    const result = await S3.send(
        new PutObjectCommand({
            Bucket: "sagamedia",
            Key: "test/file.avif",
            Body: buffer,
            ContentType: "image/avif",
            ContentLength: buffer.length,
        })
    );

    console.log(result);

    return json(200);
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
