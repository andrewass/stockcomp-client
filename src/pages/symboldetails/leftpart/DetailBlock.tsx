import { PriceChart } from "./PriceChart";
import { Box, useMediaQuery } from "@mui/material";
import { StockPrice } from "../../../domain/symbols/symbolTypes";
import { useTheme } from "@mui/material/styles";

interface Props {
  stockPrice: StockPrice;
  symbol: string;
}

const DetailBlock = (props: Props) => {
  const theme = useTheme();
  const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: isLargeWidth ? "80%" : "100%" }}
    >
      <PriceChart symbol={props.symbol} />
    </Box>
  );
};

export default DetailBlock;
