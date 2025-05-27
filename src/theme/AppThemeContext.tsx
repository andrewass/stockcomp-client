import {createContext, ReactNode, useContext, useState} from "react";
import {Theme, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "./themes";


interface AppThemeContextInterface {
    toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextInterface | undefined>(undefined);

export function AppThemeProvider({children}: {children: ReactNode}) {
    const [appTheme, setAppTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
        setAppTheme(appTheme === lightTheme ? darkTheme : lightTheme);
    }

    return (
        <AppThemeContext.Provider value={{toggleTheme}}>
            <ThemeProvider theme={appTheme}>
            {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(AppThemeContext);
    if(context === undefined) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }
    return context;
}



