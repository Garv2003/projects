import Icon from "./Icon";

const LogPreview = ({
  Bgcolor,
  rounded,
  color,
  padding,
  size,
  rotate,
  icon,
}: {
  Bgcolor: string;
  rounded: number;
  color: string;
  size: number;
  rotate: number;
  padding: number;
  icon: string;
}) => {
  console.log(Bgcolor);
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{
          padding: `${padding}px`,
        }}
      >
        <div
          id="downloadLogo"
          className="w-full h-full flex items-center justify-center"
          style={{
            borderRadius: `${rounded}px`,
            background: Bgcolor,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {icon.includes("Icon") ? (
            <img
              src={icon}
              alt={icon}
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          ) : (
            <Icon name={icon} color={color} size={size} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LogPreview;
