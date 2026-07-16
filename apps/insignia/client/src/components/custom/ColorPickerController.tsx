import ColorPicker from "react-best-gradient-color-picker";

const ColorPickerController = ({
  hideController = false,
  color,
  setColor,
}: {
  hideController?: boolean;
  color: string;
  setColor: (color: string) => void;
}) => {
  return (
    <>
      <ColorPicker
        width={300}
        height={300}
        value={color}
        hideControls={hideController}
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
        onChange={(color) => setColor(color)}
      />
    </>
  );
};

export default ColorPickerController;
