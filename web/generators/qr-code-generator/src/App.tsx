import { useRef, useState } from "react";
import ThemeBtn from "./components/ThemeBtn";
import FormQrCustom from "./components/FormQrCustom";
import QrCard from "./components/QrCard";

export default function App() {
  const qrRef = useRef<HTMLDivElement>(null);

  const [url, setUrl] = useState<string>(""),
    [qrColor, setQrColor] = useState<string>("#ffffff"),
    [qrBgColor, setQrBgColor] = useState<string>("#2c7dfa"),
    [customImg, setCustomImg] = useState<string>(""),
    [noImg, setNoImg] = useState<boolean>(false);

  const handleQrReset = () => {
    setUrl("");
    setQrColor("#ffffff");
    setQrBgColor("#2c7dfa");
    setCustomImg("");
    setNoImg(false);
  };

  return (
    <>
      <header>
        <ThemeBtn />
      </header>

      <main>
        <FormQrCustom
          qrRef={qrRef}
          url={url}
          qrColor={qrColor}
          qrBgColor={qrBgColor}
          noImg={noImg}
          setUrl={setUrl}
          setQrColor={setQrColor}
          setQrBgColor={setQrBgColor}
          setCustomImg={setCustomImg}
          setNoImg={setNoImg}
          handleQrReset={handleQrReset}
        />

        <QrCard
          qrRef={qrRef}
          url={url}
          qrColor={qrColor}
          bgColor={qrBgColor}
          customImg={customImg}
          noImg={noImg}
        />
      </main>
    </>
  );
}
