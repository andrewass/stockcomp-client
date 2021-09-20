import React, {useEffect} from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PriceChartState from "./PriceChartState";
import LoadingComponent from "../../../../util/LoadingComponent";

const PriceChart = ({symbol}) => {

    const {historicPriceList, setHistoricPrices, isLoading} = PriceChartState(symbol);

    useEffect(() => {
        setHistoricPrices().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="priceChart">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicPriceList}
                           margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Area dataKey="price" stroke="#82ca9d" fill="#82ca9d"/>
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PriceChart;
