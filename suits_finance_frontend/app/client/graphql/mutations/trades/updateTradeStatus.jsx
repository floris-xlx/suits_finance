import { gql } from '@apollo/client';

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_TRADE_STATUS_VALUE = () => gql`
    mutation UpdateTradeNoteValue(
        $trade_hash: String!,
        $updatedTradeStatus: String!
    ) {
    updatetradesCollection(
        filter: {
        and: [
            { trade_hash: { eq: $trade_hash } }
        ]
        }
        set: { trade_status: $updatedTradeStatus }
    ) {
        records {
            trade_hash,
            trade_status
        }
    }
}`;

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_VALUE_DYNAMIC_TRADES = (dynamicKey) => gql`
    mutation UpdateValueDynamic(
        $trade_hash: String!, 
        $dynamicValue: String!
    ) {
    updatetradesCollection(
        filter: {
        and: [
            { trade_hash: { eq: $trade_hash } }
        ]
        }
        set: { ${dynamicKey}: $dynamicValue }
    ) {
        records {
            trade_hash
            ${dynamicKey}
        }
    }
}`;


// mutate pending trades channel id by organization and algorithm id
export const UPDATE_BOOL_DYNAMIC_TRADES = (dynamicKey) => gql`
    mutation UpdateBoolDynamic(
        $trade_hash: String!, 
        $dynamicValue: Boolean!
    ) {
        updatetradesCollection(
        filter: {
        and: [
            { trade_hash: { eq: $trade_hash } }
        ]
        }
        set: { ${dynamicKey}: $dynamicValue }
    ) {
        records {
            trade_hash
            ${dynamicKey}
        }
    }
}`;
