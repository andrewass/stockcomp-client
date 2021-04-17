import {CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {LineChart} from "recharts/src/chart/LineChart";


const PriceChart = ({prices}) => {

    const input = [2, 4, 6, 2, 6, 7, 3, 6];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={input}
                       margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
            </LineChart>
        </ResponsiveContainer>
    )

}
