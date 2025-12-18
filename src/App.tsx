import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/queryConfig";
import AppThemeProvider from "./theme/AppThemeProvider";


export default function App() {
	return (
		<AppThemeProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</LocalizationProvider>
		</AppThemeProvider>
	);
}
