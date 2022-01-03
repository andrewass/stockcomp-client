import {useQuery} from "@apollo/client";
import {GET_STOCK_QUOTE} from "../../../../service/graphqlService";
import {CircularProgress} from "@mui/material";

const SymbolStats = ({symbolAndPrice}) => {

    const symbol = symbolAndPrice.symbol;

    const {loading, error, data} = useQuery(GET_STOCK_QUOTE, {
        variables: {symbol},
    });

    if (loading) return <CircularProgress/>;
    if (error) return `Error! ${error}`;

    return (
        <h5>Placeholder</h5>
    );
}

export default SymbolStats;