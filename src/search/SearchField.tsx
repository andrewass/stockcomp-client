import {useState} from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useApiWrapper} from "../config/useApiWrapper";
import {getSuggestionsFromQueryConfig} from "./api/searchApi";
import {SymbolSuggestion} from "./searchTypes";

const SearchField = () => {
    const {apiGet} = useApiWrapper();
    const [suggestionList, setSuggestionList] = useState<SymbolSuggestion[]>([]);

    const getSuggestions = async (query: string) => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            const suggestions = await apiGet(getSuggestionsFromQueryConfig(query));
            setSuggestionList(suggestions);
        }
    }

    const buildOptionLabel = (option: SymbolSuggestion) => {
        return option ? option.symbol + " " + option.description : "";
    }

    return (
        <Box sx={{width: 300, margin: "2rem auto"}}>
            <Autocomplete
                options={suggestionList}
                getOptionLabel={(option) => buildOptionLabel(option)}
                onInputChange={(_event, value) => getSuggestions(value)}
                renderInput={params => <TextField {...params} label="Search symbols"/>}
            />
        </Box>
    );
}

export default SearchField;
