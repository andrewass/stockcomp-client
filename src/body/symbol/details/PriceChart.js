import React from "react";
import {Area, AreaChart, Tooltip, XAxis, YAxis} from "recharts";

const PriceChart = ({priceList}) => {

    return (
        <div id="priceChart">
            <AreaChart width={730} height={250} data={priceList}
                       margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Area dataKey="price" stroke="#82ca9d" fill="#82ca9d"/>
                <Tooltip/>
            </AreaChart>
        </div>
    );
}

export default PriceChart;
