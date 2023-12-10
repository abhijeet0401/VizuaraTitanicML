import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GlobalStyles } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { blueTheme, darkTheme, globalStyles, lightTheme } from "./theme";

const MUIThemeProvider = ({
    children,
}) => {
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    useEffect(() => {
        switch (resolvedTheme) {
            case "light": setCurrentTheme(lightTheme)
                break;
            case "dark": setCurrentTheme(darkTheme)
                break;
            case "blue": setCurrentTheme(blueTheme)
                break;
            default: setCurrentTheme(lightTheme)
                break;
        }
    }, [resolvedTheme]);

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            {children}
        </ThemeProvider>
    );
};

export default MUIThemeProvider;
