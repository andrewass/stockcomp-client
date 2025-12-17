import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { type SyntheticEvent, useEffect, useId, useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import StyledTab from "../../../components/tabs/StyledTab";
import { apiGet } from "../../../config/apiWrapper";
import { getHistoricPricesConfig } from "../../../domain/symbols/symbolsApi";
import {
	type HistoricalPrice,
	Period,
} from "../../../domain/symbols/symbolTypes";
import { useThemeContext } from "../../../theme/AppThemeContext";

export default function PriceChart({ symbol }: { symbol: string }) {
	const [tabValue, setTabValue] = useState<Period>(Period.THIS_YEAR);
	const [priceList, setPriceList] = useState<HistoricalPrice[]>([]);
	const { appTheme } = useThemeContext();
	const uniqueId = useId();

	useEffect(() => {
		apiGet(getHistoricPricesConfig(symbol, tabValue)).then((response) =>
			setPriceList(response.prices),
		);
	}, [tabValue, symbol]);

	const getResponsiveContainer = () => {
		return (
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={priceList}
					margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
				>
					<defs>
						<linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="price_date" tick={{ fill: "#666", fontSize: 12 }} />
					<YAxis tick={{ fill: "#666", fontSize: 12 }} />
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							border: "none",
							boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
						}}
					/>
					<Area
						type="monotone"
						dataKey="price"
						stroke="#82ca9d"
						fillOpacity={1}
					/>
				</AreaChart>
			</ResponsiveContainer>
		);
	};

	return (
		<Box sx={{ width: "80%" }}>
			<TabContext value={tabValue}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList
						onChange={(_event: SyntheticEvent, newValue: Period) =>
							setTabValue(newValue)
						}
						aria-label="Historic Stock Price"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: appTheme.palette.primary.contrastText,
							},
						}}
					>
						<StyledTab label="1 Month" value={Period.MONTH1} />
						<StyledTab label="6 Months" value={Period.MONTH6} />
						<StyledTab label="This Year" value={Period.THIS_YEAR} />
						<StyledTab label="1 Year" value={Period.YEAR1} />
						<StyledTab label="5 Years" value={Period.YEAR5} />
						<StyledTab label="Max" value={Period.MAX} />
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
