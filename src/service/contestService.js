import axios from "axios";

const URL = {
    upcoming_contests: "http://localhost:8080/contest/upcoming-contests",
    sign_up: "http://localhost:8080/contest/sign-up",
    user_participating: "http://localhost:8080/contest/user-participating",
    place_buy_order: "http://localhost:8080/contest/place-buy-order",
    place_sell_order: "http://localhost:8080/contest/place-sell-order",
    symbol_investment: "http://localhost:8080/contest/symbol-investment",
    remaining_funds: "http://localhost:8080/contest/remaining-funds",
    total_investment_returns: "http://localhost:8080/contest/total-investment-returns",
    total_value_investments : "http://localhost:8080/contest/total-value-investments"
};

const getUpcomingContests = () => {
    return axios({
        method: "get",
        url: URL.upcoming_contests,
        withCredentials: true
    });
}

const signUpForContest = contestNumber => {
    return axios({
        method: "post",
        url: URL.sign_up,
        withCredentials: true,
        params: {contestNumber}
    });
}

const getInvestmentFromSymbol = (contestNumber, symbol) => {
    return axios({
        method: "get",
        url: URL.symbol_investment,
        withCredentials: true,
        params: {contestNumber, symbol}
    });
}

const getRemainingFunds = contestNumber => {
    return axios({
        method: "get",
        url: URL.remaining_funds,
        withCredentials: true,
        params: {contestNumber}
    });
}

const placeBuyOrder = (request) => {
    return axios({
        method: "post",
        url: URL.place_buy_order,
        withCredentials: true,
        data : request
    })
}

const placeSellOrder = (request) => {
    return axios({
        method: "post",
        url: URL.place_sell_order,
        withCredentials: true,
        data : request
    })
}

const getTotalInvestmentReturns = contestNumber => {
    return axios({
        method: "get",
        url: URL.total_investment_returns,
        withCredentials: true,
        params: {contestNumber}
    });
}

const getTotalValueInvestments = contestNumber => {
    return axios({
        method: "get",
        url: URL.total_value_investments,
        withCredentials: true,
        params: {contestNumber}
    });
}

export {
    getUpcomingContests, signUpForContest, getInvestmentFromSymbol, getRemainingFunds
    , placeBuyOrder, placeSellOrder, getTotalInvestmentReturns, getTotalValueInvestments
}

