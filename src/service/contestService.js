import axios from "axios";

const URL = {
    upcoming_contests: "http://localhost:8080/contest/upcoming-contests",
    sign_up: "http://localhost:8080/contest/sign-up",
    user_participating: "http://localhost:8080/contest/user-participating",
    buy_investment: "http://localhost:8080/contest/buy-investment",
    sell_investment: "http://localhost:8080/contest/sell-investment",
    symbol_investment: "http://localhost:8080/contest/symbol-investment",
    remaining_funds: "http://localhost:8080/contest/remaining-funds"
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

const buyInvestmentFromSymbol = (contestNumber, symbol, amount) => {
}

export {
    getUpcomingContests, signUpForContest, buyInvestmentFromSymbol, getInvestmentFromSymbol, getRemainingFunds
}

