import { useFetcher } from "@remix-run/react";
import { useState } from "react";

export default function AltUpload() {
    const [images, setImages] = useState<Array<String>>([]);
    const uploadFetcher = useFetcher();
    return (
        <input
            id="feed-new-post-files-input"
            type="file"
            multiple
            accept="image/*"
            className="file:hidden"
            onInput={(event) => {
                const files = event.currentTarget.files;
                if (!files) {
                    setImages([]);
                    return;
                }
                const formData = new FormData();
                const newImages = [];
                for (const file of files) {
                    formData.append("files", file);
                    newImages.push(URL.createObjectURL(file));
                }
                setImages(newImages);

                uploadFetcher.submit(formData, {
                    method: "post",
                    action: "/api/upload-files",
                    encType: "multipart/form-data",
                });
            }}
        />
    );
}
