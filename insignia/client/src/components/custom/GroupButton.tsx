import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadPngLogo, uploadLogo } from "@/utils";
import { useMutation } from "@apollo/client";
import { ADD_LOGO } from "@/graphql/schema";
import { toast } from "react-hot-toast";

const GroupButton = () => {
  const [addLogo, { data, loading, error }] = useMutation(ADD_LOGO);

  const uploadLogoToServer = async () => {
    const { image, imageName } = (await uploadLogo()) as {
      image: string;
      imageName: string;
    };
    addLogo({
      variables: {
        title: imageName,
        image,
      },
    });
  };

  if (error) {
    toast.error("Error uploading logo");
  }

  if (data) {
    toast.success("Logo uploaded successfully");
  }

  return (
    <div className="mt-5 gap-2 flex">
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        onClick={downloadPngLogo}
      >
        <Download size={16} className="mr-2" />
        Download
      </Button>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={uploadLogoToServer}
        disabled={loading}
      >
        Save
      </Button>
    </div>
  );
};

export default GroupButton;
