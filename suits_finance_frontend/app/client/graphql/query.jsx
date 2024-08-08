// import the local modules
import { GET_ALERTS } from './queries/alerts';
import { TBR_SIGNAL } from './queries/trades';
import { GET_VALUE_DYNAMIC } from './queries/getValueAlgorithms';
import { GET_TRADE_NOTE_VALUE } from './queries/getNoteValueTrades';
import { GET_BOOL_VALUE_USERS } from './queries/users/getBoolUsers';
import { GET_VALUE_DYNAMIC_TRADES } from './queries/trades/getValueTrades';
import { GET_STRATEGIES } from './queries/strategies/getStrategies';
import { GET_VALUE_USERS } from './queries/users/getValueUsers';

// re-export
export { 
    GET_ALERTS, 
    TBR_SIGNAL,
    GET_VALUE_DYNAMIC,
    GET_TRADE_NOTE_VALUE,
    GET_BOOL_VALUE_USERS,
    GET_VALUE_DYNAMIC_TRADES,
    GET_STRATEGIES,
    GET_VALUE_USERS
}