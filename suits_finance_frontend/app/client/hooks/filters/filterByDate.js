const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
};


const filterTradesByDate = ({ 
    trades, 
    dateRange 
}) => {
    if (dateRange) {
        const [startDateStr, endDateStr] = dateRange.split('_');
        const startDate = formatDate(startDateStr);
        const endDate = new Date(formatDate(endDateStr).getTime() + 24 * 60 * 60 * 1000);

        const filteredTrades = [];
        for (const trade of trades) {
            const tradeDate = new Date(trade.created_at);
   
            if (tradeDate >= startDate && tradeDate <= endDate) {
                filteredTrades.push(trade);
            }
        }

        return filteredTrades;
    }

    
    return trades;
};

export default filterTradesByDate;