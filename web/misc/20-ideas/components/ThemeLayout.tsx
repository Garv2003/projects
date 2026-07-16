"use client";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";

const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col items-center p-4 md:p-10 min-h-screen"
      data-theme={theme}
    >
      <div className="max-w-2xl w-full items-center flex flex-col">
        <Toaster position="top-right" />
        {children}
      </div>
    </div>
  );
};

export default ThemeLayout;
