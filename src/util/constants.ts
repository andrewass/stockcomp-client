



const TRANSACTION_TYPE = {
    SELL: "SELL",
    BUY: "BUY"
}

const codeMapTransaction = new Map<string, string>([
    ["Buy", TRANSACTION_TYPE.BUY],
    ["Sell", TRANSACTION_TYPE.SELL]
])



export {
    TRANSACTION_TYPE, codeMapTransaction,
}

