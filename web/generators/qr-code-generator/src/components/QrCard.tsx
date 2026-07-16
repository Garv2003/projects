import QrCode from "qrcode.react";

export default function QrCard({
  qrRef,
  url,
  bgColor,
  qrColor,
  customImg,
  noImg,
}: {
  qrRef: React.RefObject<HTMLDivElement>;
  url: string;
  bgColor: string;
  qrColor: string;
  customImg: string;
  noImg: boolean;
}) {
  let imgCustom: string;

  if (noImg) {
    imgCustom = "";
  } else {
    imgCustom = customImg ? customImg : "./logo-apple-icon192.png";
  }

  return (
    <article className="card">
      <div className="qr-box" ref={qrRef} style={{ backgroundColor: bgColor }}>
        <QrCode
          size={250}
          value={url ? url : "Generate your Qr Code"}
          bgColor={bgColor}
          fgColor={qrColor}
          level="H"
          includeMargin
          imageSettings={{
            src: imgCustom,
            height: 45,
            width: 45,
            excavate: true,
          }}
        />
      </div>
      <h2 className="word-wrap">{url ? url : "Generate your Qr Code"}</h2>
      <p>
        Enter the URL of your site and create your custom Qr Code in a few
        seconds with a few clicks.
      </p>
    </article>
  );
}
