import {CircularProgress, Stack} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {StockFinancials, StockPrice} from "../../domain/symbols/symbolTypes";
import {
    GET_STOCK_SYMBOL_FINANCIALS,
    GET_STOCK_SYMBOL_PRICE,
    getStockSymbolFinancialsConfig,
    getStockSymbolPriceConfig
} from "../../domain/symbols/symbolsApi";
import ErrorComponent from "../../error/ErrorComponent";
import DetailBlock from "./leftpart/DetailBlock";
import {SymbolDetailsRightMenu} from "./rightpart/SymbolDetailsRightMenu";
import {DetailedParticipant} from "../../domain/participant/participantTypes";
import {GET_PARTICIPANTS_SYMBOL, getDetailedParticipantsForSymbolConfig} from "../../domain/participant/participantApi";
import SearchField from "../../search/SearchField";
import React from "react";
import SymbolStatistics from "./SymbolStatistics";

interface Props {
    symbol: string
}

const SymbolDetailsPage = ({symbol}: Props) => {
    const {apiGet} = useApiWrapper();

    const {
        isPending: isStockPricePending,
        isError: isStockPriceError,
        error: stockPriceError,
        data: stockPrice
    } =
        useQuery<StockPrice>({
            queryKey: [GET_STOCK_SYMBOL_PRICE, symbol],
            queryFn: () => apiGet(getStockSymbolPriceConfig(symbol as string)),
        });

    const {
        error: financialsError,
        isError: isFinancialsError,
        isPending: isFinancialsPending,
        data: financials
    } =
        useQuery<StockFinancials>({
            queryKey: [GET_STOCK_SYMBOL_FINANCIALS, symbol],
            queryFn: () => apiGet(getStockSymbolFinancialsConfig(symbol as string)),
        });

    const {
        isPending: isParticipantPending,
        isError: isParticipantError,
        error: participantError,
        data: participants
    } = useQuery<DetailedParticipant[]>({
        queryKey: [GET_PARTICIPANTS_SYMBOL],
        queryFn: () => apiGet(getDetailedParticipantsForSymbolConfig(symbol)),
    });

    if (isStockPricePending || isParticipantPending || isFinancialsPending) {
        return <CircularProgress/>;
    }

    if (isParticipantError || isStockPriceError || isFinancialsError) {
        const error= participantError ?? (stockPriceError ?? financialsError);
        return <ErrorComponent error={error} />;
    }

    if (participants.length > 0) {
        return (
            <Stack direction="column" gap={4} paddingTop="40px">
                <SearchField/>
                <SymbolStatistics stockFinancials={financials} stockPrice={stockPrice}/>
                <Stack direction="row">
                    <DetailBlock stockPrice={stockPrice} symbol={symbol!}/>
                    <SymbolDetailsRightMenu stockPrice={stockPrice} participants={participants}/>
                </Stack>
            </Stack>
        );
    } else {
        return (
            <Stack direction="column" gap={4}>
                <SearchField/>
                <SymbolStatistics stockFinancials={financials} stockPrice={stockPrice}/>
                <DetailBlock stockPrice={stockPrice} symbol={symbol!}/>
            </Stack>
        );
    }
}

export default SymbolDetailsPage;
