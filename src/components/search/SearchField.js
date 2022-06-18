import {useState} from "react";
import {getSuggestionsFromQuery} from "../../api/symbolClient";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SearchField = () => {

    const navigate = useNavigate();
    const [suggestionList, setSuggestionList] = useState([]);

    const getSuggestions = async (query) => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            const suggestions = await getSuggestionsFromQuery(query);
            setSuggestionList(suggestions);
        }
    };

    const redirectToSymbolDetail = symbol => {
        navigate(`/symbol/${symbol.symbol}`);
    }

    const buildOptionLabel = option => {
        return option ? option.symbol + " " + option.description : "";
    }

    return (
        <Box sx={{width: 300, margin: "2rem auto"}}>
            <Autocomplete
                freeSolo
                options={suggestionList}
                getOptionLabel={option => buildOptionLabel(option)}
                onChange={(event, value) => redirectToSymbolDetail(value)}
                onInputChange={(event, value) => getSuggestions(value)}
                renderInput={params => <TextField {...params} label="Search symbols"/>}
            />
        </Box>
    );
}

export default SearchField;
