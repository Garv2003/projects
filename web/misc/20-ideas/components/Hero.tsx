"use client";
import { themes } from "../constants/themes";
import { useTheme } from "../hooks/useTheme";

const Hero = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  };

  return (
    <div className="my-5 flex flex-col items-center gap-5">
      <h2 className="text-3xl font-bold text-center">
        Top 20 Productive ideas for your next startup
      </h2>
      <h2 className="text-center my-3">
        <strong className="text-secondary">Like your favorites ideas.</strong>{" "}
        write your best ideas, No account needed!
      </h2>
      <div>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleThemeChange}
          value={theme}
        >
          <option disabled>Select Theme</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Hero;
