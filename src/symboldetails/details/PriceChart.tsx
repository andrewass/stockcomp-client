import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box, Tab} from "@mui/material";
import {useApiWrapper} from "../../config/useApiWrapper";
import {HistoricalPrice} from "../../stock/stockTypes";
import {SyntheticEvent, useEffect, useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Period} from "../symbolTypes";
import {getHistoricPricesConfig} from "../api/symbolDetailsApi";


export const PriceChart = ({symbol}: { symbol: string }) => {
    const [tabValue, setTabValue] = useState<Period>(Period.THIS_YEAR);
    const [priceList, setPriceList] = useState<HistoricalPrice[]>([]);
    const {apiGet} = useApiWrapper();

    useEffect(() => {
        apiGet(getHistoricPricesConfig(symbol, tabValue))
            .then(response => setPriceList(response.prices))
    }, [tabValue])

    const handleTabChange = (event: SyntheticEvent, newValue: Period) => {
        setTabValue(newValue);
    };

    const getResponsiveContainer = () => {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={priceList} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="price_date" tick={{fill: '#666', fontSize: 12}}/>
                    <YAxis tick={{fill: '#666', fontSize: 12}}/>
                    <Tooltip contentStyle={{
                        backgroundColor: '#fff',
                        border: 'none',
                        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                    }}/>
                    <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPrice)"/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    return (
        <Box id="priceChart" sx={{marginTop: "10%", width: "80%"}}>
            <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange} aria-label="Historic Stock Price">
                        <Tab label="1 Month" value={Period.MONTH1}/>
                        <Tab label="6 Months" value={Period.MONTH6}/>
                        <Tab label="This Year" value={Period.THIS_YEAR}/>
                        <Tab label="1 Year" value={Period.YEAR1}/>
                        <Tab label="5 Years" value={Period.YEAR5}/>
                        <Tab label="Max" value={Period.MAX}/>
                    </TabList>
                </Box>
                <TabPanel value={Period.MONTH1}>{getResponsiveContainer()}</TabPanel>
                <TabPanel value={Period.MONTH6}>{getResponsiveContainer()}</TabPanel>
                <TabPanel value={Period.THIS_YEAR}>{getResponsiveContainer()}</TabPanel>
                <TabPanel value={Period.YEAR1}>{getResponsiveContainer()}</TabPanel>
                <TabPanel value={Period.YEAR5}>{getResponsiveContainer()}</TabPanel>
                <TabPanel value={Period.MAX}>{getResponsiveContainer()}</TabPanel>
            </TabContext>
        </Box>
    );
}
