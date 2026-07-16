import { icons } from "lucide-react";

const Icon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) => {
  const LucidIcon = icons[name as keyof typeof icons];
  if (!LucidIcon) {
    return null;
  }
  return <LucidIcon color={color} size={size} />;
};

export default Icon;
