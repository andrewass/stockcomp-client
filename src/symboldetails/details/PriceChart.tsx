import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box, CircularProgress, Tab} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_HISTORIC_PRICES, getHistoricPricesConfig} from "../api/symbolDetailsApi";
import {HistoricalPrices} from "../../stock/stockTypes";
import ErrorComponent from "../../error/ErrorComponent";
import {SyntheticEvent, useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Period} from "../symbolTypes";


export const PriceChart = ({symbol}: { symbol: string }) => {
    const [tabValue, setTabValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const {apiGet} = useApiWrapper();

    const {isLoading, isFetching, error, data} = useQuery<HistoricalPrices>(
        [GET_HISTORIC_PRICES, symbol],
        () => apiGet(getHistoricPricesConfig(symbol, Period.THIS_YEAR))
    );

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    const {historicalPriceList} = data!

    const getResponsiveContainer = () => {
        return (
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
        );
    }


    return (
        <Box id="priceChart" sx={{marginTop: "10%", width: "80%"}}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Historic Stock Price">
                        <Tab label="1 Week" value="1" />
                        <Tab label="1 Month" value="2" />
                        <Tab label="6 Months" value="3" />
                        <Tab label="This Year" value="4" />
                        <Tab label="1 Year" value="5" />
                        <Tab label="5 Years" value="6" />
                        <Tab label="Max" value="7" />
                    </TabList>
                </Box>
                <TabPanel value="1">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="2">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="3">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="4">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="5">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="6">{getResponsiveContainer()}</TabPanel>
                <TabPanel value="7">{getResponsiveContainer()}</TabPanel>
            </TabContext>
        </Box>
    );
}
