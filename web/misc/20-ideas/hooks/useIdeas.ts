import { useContext } from "react";
import { IdeasContext } from "../context/IdeasContext";

export const useIdeas = () => {
    const context = useContext(IdeasContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
