const filterTradesByStatus = ({ trades, tradeStatus }) => {
    if (tradeStatus && tradeStatus !== 'all') {
        return trades.filter(trade => trade.trade_status === tradeStatus);
    }
    return trades;
};
export default filterTradesByStatus;