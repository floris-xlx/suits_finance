const TradeStatus = {
    entry: 'entry',
    pending: 'pending',
    unapproved: 'unapproved',
    tp1: 'tp1',
    tp2: 'tp2',
    tp3: 'tp3',
    loss: 'loss',
    invalid: 'invalid',
};

const TradeStatusOrder = [
    TradeStatus.pending,
    TradeStatus.entry,
    TradeStatus.unapproved,
    TradeStatus.tp1,
    TradeStatus.tp2,
    TradeStatus.tp3,
    TradeStatus.loss,
    TradeStatus.invalid
];

export { TradeStatus, TradeStatusOrder };