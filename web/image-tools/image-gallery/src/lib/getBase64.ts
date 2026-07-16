import { getPlaiceholder } from "plaiceholder";

import type { Photo, ImagesResults } from "@/models/Images";

async function getBase64(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch images");
        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return base64;
    }
    catch (error) {
        console.error(error);
    }
}

export default async function addBluredDataUrls(images: ImagesResults) {
    const base64Promises = images.photos.map(photo => getBase64(photo.src.large));

    const base64Results = await Promise.all(base64Promises);

    const photoWithBlur: Photo[] = images.photos.map((photo, index) => {
        photo.blurredDataUrl = base64Results[index];
        return photo;
    })
    return photoWithBlur;
}
