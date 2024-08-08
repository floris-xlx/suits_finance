import { gql, useMutation } from '@apollo/client';

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_TRADE_NOTE_VALUE = () => gql`
    mutation UpdateTradeNoteValue(
        $trade_hash: String!,
        $updatedNoteValue: String!
    ) {
    updatetradesCollection(
        filter: {
        and: [
            { trade_hash: { eq: $trade_hash } }
        ]
        }
        set: { note: $updatedNoteValue }
    ) {
        records {
            trade_hash,
            note
        }
    }
}`;