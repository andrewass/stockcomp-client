import {useState} from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useApiWrapper} from "../config/useApiWrapper";
import {getSuggestionsFromQueryConfig} from "./api/searchApi";
import {SymbolSuggestion} from "./searchTypes";

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
        navigate(`/symbols/${symbol.symbol}`);
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
                onChange={(event, value) => redirectToSymbolDetail(value)}
                onInputChange={(event, value) => getSuggestions(value)}
                renderInput={params => <TextField {...params} label="Search symbols"/>}
            />
        </Box>
    );
}

export default SearchField;
