import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getHistoricPrices} from "../../api/symbolClient";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";

export const PriceChart = ({symbol}) => {

    const fetchHistoricPrices = () => {
        return getHistoricPrices(symbol);
    }

    const {isLoading, isFetching, error, data} = useQuery(["getHistoricPrices",symbol], fetchHistoricPrices);

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
