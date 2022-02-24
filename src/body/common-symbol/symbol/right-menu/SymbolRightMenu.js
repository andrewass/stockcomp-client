import {OrderSymbol} from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import {getActiveContests} from "../../../../service/contestService";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";

export const SymbolRightMenu = ({symbol, stockQuote, isLargeWidth}) => {

    const getActiveContest = contests => {
        return contests.find(contest => contest.userParticipating);
    }

    const fetchActiveContests = async () => {
        let response = await getActiveContests();
        return getActiveContest(response.data);
    }

    const {isLoading, error, data} = useQuery("getActiveContests", fetchActiveContests);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    if(data){
        return (
            <Box id="symbolRightMenu" display="flex" flexDirection="column"
                 sx={{width: isLargeWidth ? "30%" :"70%", ml:"2rem"}}>
                <InvestmentSymbol contest={data} symbol={symbol}/>
                <OrderSymbol contest={data} symbol={symbol} stockQuote={stockQuote}/>
            </Box>
        );
    }
    return null;
}