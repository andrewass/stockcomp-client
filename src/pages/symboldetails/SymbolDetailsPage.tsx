import {CircularProgress, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {StockPrice} from "../../domain/symbols/symbolTypes";
import {GET_STOCK_SYMBOL_PRICE, getStockSymbolPriceConfig} from "../../domain/symbols/symbolsApi";
import ErrorComponent from "../../error/ErrorComponent";
import DetailBlock from "./leftpart/DetailBlock";
import {SymbolDetailsRightMenu} from "./rightpart/SymbolDetailsRightMenu";
import {DetailedParticipant} from "../../domain/participant/participantTypes";
import {GET_PARTICIPANTS_SYMBOL, getRunningParticipantsForSymbolConfig} from "../../domain/participant/participantApi";
import SearchField from "../../search/SearchField";
import React from "react";

const SymbolDetailsPage = () => {
    const {symbol} = useParams<{ symbol: string }>();
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
        isPending: isParticipantPending,
        isError: isParticipantError,
        error: participantError,
        data: participants
    } = useQuery<DetailedParticipant[]>({
        queryKey: [GET_PARTICIPANTS_SYMBOL],
        queryFn: () => apiGet(getRunningParticipantsForSymbolConfig(symbol!!)),
    });

    if (isStockPricePending || isParticipantPending) return <CircularProgress/>;

    if (isParticipantError || isStockPriceError) {
        return <ErrorComponent errorMessage={participantError?.message ?? stockPriceError!.message}/>;
    }

    if (participants.length > 0) {
        return (
            <Stack direction="column" gap={4}>
                <SearchField/>
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
                <DetailBlock stockPrice={stockPrice} symbol={symbol!}/>
            </Stack>
        );
    }
}

export default SymbolDetailsPage;