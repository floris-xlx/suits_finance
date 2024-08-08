import { UPDATE_CHANNEL_ID_PENDING_TRADES } from "./mutations/algorithms/channelIdPendingTrades";
import { UPDATE_VALUE_DYNAMIC, UPDATE_BOOL_DYNAMIC } from "./mutations/algorithms/updateValueAlgorithms";
import { UPDATE_TRADE_NOTE_VALUE } from "./mutations/algorithms/updateNoteValueTrades";
import { UPDATE_BOOL_USERS } from "./mutations/algorithms/users/updateBoolUsers";
import { UPDATE_TRADE_STATUS_VALUE, UPDATE_BOOL_DYNAMIC_TRADES, UPDATE_VALUE_DYNAMIC_TRADES } from "./mutations/trades/updateTradeStatus";
import { UPDATE_VALUE_USERS } from "./mutations/algorithms/users/updateValueUsers";
// mutate pending trades channel id by organization and algorithm id


export {
    UPDATE_CHANNEL_ID_PENDING_TRADES,
    UPDATE_VALUE_DYNAMIC,
    UPDATE_BOOL_DYNAMIC,
    UPDATE_TRADE_NOTE_VALUE,
    UPDATE_BOOL_USERS,
    UPDATE_TRADE_STATUS_VALUE,
    UPDATE_BOOL_DYNAMIC_TRADES,
    UPDATE_VALUE_DYNAMIC_TRADES,
    UPDATE_VALUE_USERS
}