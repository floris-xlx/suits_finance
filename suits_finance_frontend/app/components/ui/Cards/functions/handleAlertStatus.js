// wip
export const handleAlertStatusChange = async (trade, newStatus, isEditing, setSelectedTradeAlerts) => {
    if (isEditing) {
      try {
        await UpdateTradeAlertStatus(trade.trade_hash, newStatus);
        setSelectedTradeAlerts(newStatus);
      } catch (error) {
        console.error('Error updating alert status:', error);
      }
    }
};

export const fetchAlertStatus = async (trade, isEditing, setSelectedTradeAlerts) => {
    if (isEditing) {
      try {
        const alertStatus = await GetAlertStatusByTradeHash(trade.trade_hash);
        setSelectedTradeAlerts(alertStatus);
      } catch (error) {
        console.error('Error fetching alert status:', error);
      }
    }
};