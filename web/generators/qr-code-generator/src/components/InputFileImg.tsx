import React from "react";

export default function InputFileImg({
  noImg,
  setNoImg,
  setCustomImg,
}: {
  noImg: boolean;
  setNoImg: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomImg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && reader.result) {
        setCustomImg(reader.result.toString());
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <label
        htmlFor="file"
        style={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        Upload custom image
      </label>
      <input
        id="file"
        name="file"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImage}
        disabled={noImg}
        style={{
          marginBottom: "1rem",
        }}
      />

      <input
        id="noImg"
        name="noImg"
        type="checkbox"
        value={noImg.toString()}
        checked={noImg}
        onClick={() => setNoImg(!noImg)}
      />
      <label htmlFor="noImg">Without image</label>
    </>
  );
}
