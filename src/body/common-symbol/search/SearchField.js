import React, {useContext, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import {getSuggestionsFromQuery} from "../../../service/symbolService";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useHistory} from "react-router-dom";

const SearchField = () => {

    const {setSelectedSymbol} = useContext(SymbolContext);
    const history = useHistory();
    const [suggestionList, setSuggestionList] = useState([]);

    const getSuggestions = async (value) => {
        if (value === "") {
            setSuggestionList([]);
        } else {
            const response = await getSuggestionsFromQuery(value);
            setSuggestionList(response.data);
        }
    };

    const redirectToSymbolDetail = symbol => {
        setSelectedSymbol(symbol);
        history.push("/symbol-detail");
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
                renderInput={params => (
                    <TextField {...params} label="Search symbols"/>
                )}
            />
        </Box>
    );
}

export default SearchField;
