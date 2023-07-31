import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_HISTORIC_PRICES, getHistoricPricesConfig} from "../api/symbolDetailsApi";
import {HistoricalPrices} from "../../stock/stockTypes";
import ErrorComponent from "../../error/ErrorComponent";


export const PriceChart = ({symbol}: { symbol: string }) => {
    const {apiGet} = useApiWrapper();

    const {isLoading, isFetching, error, data} = useQuery<HistoricalPrices>(
        [GET_HISTORIC_PRICES, symbol],
        () => apiGet(getHistoricPricesConfig(symbol))
    );

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    const {historicalPriceList} = data!

    return (
        <Box id="priceChart" sx={{marginTop: "10%", width: "80%"}}>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalPriceList} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tick={{fill: '#666', fontSize: 12}}/>
                    <YAxis tick={{fill: '#666', fontSize: 12}}/>
                    <Tooltip contentStyle={{
                        backgroundColor: '#fff',
                        border: 'none',
                        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                    }}/>
                    <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPrice)"/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
