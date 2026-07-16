import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import IconList from "./IconList";

const IconController = ({
  color,
  setColor,
  size,
  setSize,
  rotate,
  setRotate,
  icon,
  setIcon,
}: {
  color: string;
  setColor: (color: string) => void;
  size: number;
  setSize: (size: number) => void;
  rotate: number;
  setRotate: (rotate: number) => void;
  icon: string;
  setIcon: (icon: string) => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <IconList icon={icon} setIcon={setIcon} />
        <div className="py-3">
          <label className="py-2 flex justify-between items-center">
            Size <span>{size}px</span>
          </label>
          <Slider
            defaultValue={[size]}
            max={512}
            step={1}
            onValueChange={(value) => setSize(value[0])}
          />
        </div>
        <div className="py-3">
          <label className="p-2 flex justify-between items-center">
            Rotate <span>{rotate}°</span>
          </label>
          <Slider
            defaultValue={[rotate]}
            max={360}
            step={1}
            onValueChange={(value) => setRotate(value[0])}
          />
        </div>
        <div className="py-3">
          <label className="pb-2 flex justify-between items-center">
            Icon Color
          </label>
          <ColorPickerController
            hideController={true}
            color={color}
            setColor={setColor}
          />
        </div>
      </div>
    </div>
  );
};

export default IconController;
