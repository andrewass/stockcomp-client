import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "../../../config/myTheme";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries:{
            retry: false
        }
    }
})

export const Wrapper = (props : any) => {
    return (
        <Router>
            <ThemeProvider theme={myTheme}>
                <QueryClientProvider client={queryClient}>
                    {props.children}
                </QueryClientProvider>
            </ThemeProvider>
        </Router>
    )
}