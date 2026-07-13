import { useTheme } from "../context/ThemeProvider";
import { A } from "@solidjs/router";

const themes = [
  "light",
  "dark",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "forest",
  "aqua",
  "black",
  "luxury",
  "dracula",
  "business",
  "acid",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
]

const NavBar = () => {
  const { setTheme } = useTheme();

  function handleThemeChange(theme: string) {
    setTheme(theme);
    localStorage.setItem("theme", theme)
  }

  return (
    <div class="navbar bg-base-300">
      <div class="flex-1 px-2 lg:flex-none">
        <A href="/" class="text-lg font-bold">TastyTrails</A>
      </div>
      <div class="flex flex-1 justify-end px-2">
        <div class="flex items-stretch">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">Theme</div>
            <ul
              tabindex="0"
              class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
              {themes.map((t) => (
                <li
                  class="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => handleThemeChange(t)}
                >{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
