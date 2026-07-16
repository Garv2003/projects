import { useTheme } from "../context/ThemeProvider";
import { ParentComponent } from "solid-js";
import NavBar from "./NavBar";

const AppLayout : ParentComponent = (props) => {
    const { theme } = useTheme();

    return (
        <div data-theme={theme()} class="w-full min-h-screen">
            <NavBar />
            {props.children}
        </div>
    )
}

export default AppLayout;