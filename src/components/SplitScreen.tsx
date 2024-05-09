import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

interface Props {
    left: JSX.Element
    right: JSX.Element
    leftWeight: number
    rightWeight: number
}

const SplitScreen = ({left, right, leftWeight, rightWeight}: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Box sx={{
            m: "3% 5%", display: "flex", alignItems: "flex-start",
            flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
        }}>
            {left}
            {right}
        </Box>
    );
}

export default SplitScreen;