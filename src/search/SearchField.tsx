import {useState} from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useApiWrapper} from "../config/useApiWrapper";
import {getSuggestionsFromQueryConfig} from "./api/searchApi";
import {SymbolSuggestion} from "./searchTypes";
import {useNavigate} from "@tanstack/react-router";

const SearchField = () => {
    const {apiGet} = useApiWrapper();
    const navigate = useNavigate();
    const [suggestionList, setSuggestionList] = useState<SymbolSuggestion[]>([]);

    const getSuggestions = async (query: string) => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            const suggestions = await apiGet(getSuggestionsFromQueryConfig(query));
            setSuggestionList(suggestions);
        }
    }

    const redirectToSymbolDetail = (symbol: any) => {
        navigate({to: "/symbols/$symbol", params: {symbol: symbol.symbol}})
            .catch(console.error);
    }

    const buildOptionLabel = (option: any) => {
        return option ? option.symbol + " " + option.description : "";
    }

    return (
        <Box sx={{width: 300, margin: "2rem auto"}}>
            <Autocomplete
                freeSolo
                options={suggestionList}
                getOptionLabel={(option) => buildOptionLabel(option)}
                onChange={(_event, value) => redirectToSymbolDetail(value)}
                onInputChange={(_event, value) => getSuggestions(value)}
                renderInput={params => <TextField {...params} label="Search symbols"/>}
            />
        </Box>
    );
}

export default SearchField;
