import {ReactNode, useState} from "react";
import {CssBaseline, Theme, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "./themes";
import { AppThemeContext } from "./AppThemeContext";

export default function AppThemeProvider({children}: {children: ReactNode}) {
    const [appTheme, setAppTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
        setAppTheme(appTheme === lightTheme ? darkTheme : lightTheme);
    }

    return (
        <AppThemeContext.Provider value={{toggleTheme, appTheme}}>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
}
