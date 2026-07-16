import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from './env';

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: env.PEXELS_API_KEY
            }
        });
        if (!res.ok) throw new Error("Unable to fetch images");

        const ImagesResults: ImagesResults = await res.json();

        const parsedDate = ImagesSchemaWithPhotos.parse(ImagesResults);

        if (parsedDate.total_results === 0) return undefined;

        return parsedDate;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
}