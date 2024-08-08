const filterTradesByAlgorithm = ({ trades, algorithmId }) => {
    if (algorithmId) {
        return trades.filter(trade => trade.algorithm_id === algorithmId);
    }
    return trades;
};

export default filterTradesByAlgorithm;