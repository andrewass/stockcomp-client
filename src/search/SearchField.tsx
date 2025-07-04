import { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useApiWrapper } from "../config/useApiWrapper";
import { getSuggestionsFromQueryConfig } from "./api/searchApi";
import { useNavigate } from "@tanstack/react-router";
import { SymbolSuggestion } from "./searchTypes";

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
          <TextField {...params} label="Search symbols" />
        )}
      />
    </Box>
  );
};

export default SearchField;
