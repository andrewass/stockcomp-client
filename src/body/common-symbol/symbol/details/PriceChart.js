import React, {useEffect, useState} from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getHistoricPrices} from "../../../../service/symbolService";
import {Box, CircularProgress} from "@mui/material";

const PriceChart = ({symbol}) => {

    const [historicPriceList, setHistoricPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const setHistoricPrices = async () => {
        setIsLoading(true);
        const response = await getHistoricPrices(symbol.symbol);
        setHistoricPriceList(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        setHistoricPrices().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <Box id="priceChart" sx={{marginTop:"10%", width:"80%"}}>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicPriceList}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Area dataKey="price" stroke="#82ca9d" fill="#82ca9d"/>
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default PriceChart;
