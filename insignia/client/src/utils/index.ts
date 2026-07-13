import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";

export const downloadPngLogo = async () => {
    const downloadLogoDiv = document.getElementById("downloadLogo");
    if (downloadLogoDiv) {
        try {
            const canvas = await html2canvas(downloadLogoDiv, {
                backgroundColor: null,
            });
            const link = document.createElement("a");
            link.download = "logo.png";
            link.href = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            link.click();
            toast.success("Logo downloaded successfully");
        } catch (error) {
            toast.error("Error downloading logo");
        }
    }
};

export const uploadLogo = async () => {
    const logo = document.getElementById("downloadLogo");
    if (logo) {
        const canvas = await html2canvas(logo, {
            backgroundColor: null,
        })

        const imageName = `${Date.now()}.png`;

        const image = canvas.toDataURL("image/png");

        return { image, imageName }
    }
};

export const DownLoad = (logo: string) => {
    const link = document.createElement("a");
    link.download = "logo.png";
    link.href = logo.replace(
        "image/png",
        "image/octet-stream"
    );
    link.click();
}