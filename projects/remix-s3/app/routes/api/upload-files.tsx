import { ActionArgs, json } from "@remix-run/node";

export async function action({ context, request }: ActionArgs) {
    const formData = await request.formData();
    const toUpload = formData.getAll("files");

    const uploadPromises = [];
    for (const file of toUpload) {
        if (typeof file === "string" || !file) {
            throw json({ error: "Invalid file" }, { status: 400 });
        }
    }
}
