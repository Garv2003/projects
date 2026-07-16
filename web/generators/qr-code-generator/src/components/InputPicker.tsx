import { useState } from "react";
import { SketchPicker } from "react-color";

export default function InputPicker({
  id,
  label,
  customColor,
  handleQrCustom,
}: {
  id: string;
  label: string;
  customColor: string;
  handleQrCustom: (color: { hex: string }) => void;
}) {
  const [showPicker, setShowPicker] = useState(false),
    handleShowPicker = () => setShowPicker(!showPicker);

  return (
    <div
      className="relative"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <input
        id={id}
        name={id}
        aria-label={id}
        type="button"
        style={{ background: customColor }}
        onClick={handleShowPicker}
      />
      <label
        htmlFor={id}
        style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}
      >
        Customize {label}
      </label>

      {showPicker && (
        <SketchPicker
          presetColors={["#000000", "#FFFFFF"]}
          color={customColor}
          onChange={handleQrCustom}
        />
      )}
    </div>
  );
}
