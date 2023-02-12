import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import {HistoricalQuote} from "../symbolDetailTypes";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_HISTORIC_PRICES, getHistoricPricesConfig} from "../api/symbolDetailsApi";

interface Props{
    symbol: string
}

export const PriceChart = ({symbol}: Props) => {
    const {apiGet} = useApiWrapper();

    const {isLoading, isFetching, error, data} = useQuery<HistoricalQuote[]>(
        [GET_HISTORIC_PRICES,symbol],
        () => apiGet(getHistoricPricesConfig(symbol)));

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box id="priceChart" sx={{marginTop:"10%", width:"80%"}}>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Area dataKey="price" stroke="#82ca9d" fill="#82ca9d"/>
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
