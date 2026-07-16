import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";

const BackgroundController = ({
  rounded,
  padding,
  Bgcolor,
  setRounded,
  setPadding,
  setBgColor,
}: {
  rounded: number;
  padding: number;
  Bgcolor: string;
  setRounded: (value: number) => void;
  setPadding: (value: number) => void;
  setBgColor: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <div className="py-3">
          <label className="p-2 flex justify-between items-center">
            Rounded <span>{rounded}px</span>
          </label>
          <Slider
            defaultValue={[rounded]}
            max={512}
            step={1}
            onValueChange={(value) => setRounded(value[0])}
          />
        </div>
        <div className="py-3">
          <label className="p-2 flex justify-between items-center">
            Padding <span>{padding}px</span>
          </label>
          <Slider
            defaultValue={[padding]}
            max={512}
            step={1}
            onValueChange={(value) => setPadding(value[0])}
          />
        </div>
        <div className="py-3">
          <label className="pb-2 flex justify-between items-center">
            BackGround Color
          </label>
          <ColorPickerController
            hideController={false}
            color={Bgcolor}
            setColor={setBgColor}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundController;
