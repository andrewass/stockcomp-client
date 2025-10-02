import { Autocomplete, Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import StyledTextField from "../components/input/StyledTextField";
import { useApiWrapper } from "../config/useApiWrapper";
import { getSuggestionsFromQueryConfig } from "./api/searchApi";
import type { SymbolSuggestion } from "./searchTypes";

const SearchField = () => {
	const { apiGet } = useApiWrapper();
	const navigate = useNavigate();
	const [suggestionList, setSuggestionList] = useState<SymbolSuggestion[]>([]);

	const getSuggestions = async (query: string) => {
		if (query === "") {
			setSuggestionList([]);
		} else {
			const suggestions = await apiGet(getSuggestionsFromQueryConfig(query));
			setSuggestionList(suggestions);
		}
	};

	const navigateToSymbolDetail = (symbol: string | SymbolSuggestion | null) => {
		if (symbol === null) {
			return;
		}
		const symbolValue = typeof symbol === "string" ? symbol : symbol.symbol;
		navigate({
			to: "/symbols/$symbol",
			params: { symbol: symbolValue },
		}).catch(console.error);
	};

	const buildOptionLabel = (option: SymbolSuggestion | string) => {
		if (typeof option === "string") {
			return option;
		}
		return `${option.symbol} - ${option.description}`;
	};

	return (
		<Box sx={{ width: 300 }}>
			<Autocomplete
				freeSolo
				options={suggestionList}
				isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
				getOptionLabel={(option) => buildOptionLabel(option)}
				onChange={(_event, value) => navigateToSymbolDetail(value)}
				onInputChange={(_event, value) => getSuggestions(value)}
				renderInput={(params) => (
					<StyledTextField autoCompleteParams={params} label="Search symbols" />
				)}
			/>
		</Box>
	);
};

export default SearchField;
