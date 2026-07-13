import { createContext, createSignal, useContext, JSX } from "solid-js";
import type { Accessor, Setter } from "solid-js";

interface Context {
    theme: Accessor<string>;
    setTheme: Setter<string>;
}

const ThemeContext = createContext<Context | undefined>(undefined);

export const ThemeProvider = (props: { children: JSX.Element }) => {
    const [theme, setTheme] = createSignal<string>(
        localStorage.getItem("theme") || "dark"
    );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContext.Provider");
    }
    return context;
};