import { gql, useMutation } from '@apollo/client';


// mutate pending trades channel id by organization and algorithm id
export const UPDATE_CHANNEL_ID_PENDING_TRADES = gql`
    mutation UpdateChannelIdPendingTrades(
        $algorithm_id: String!, 
        $organization: String!, 
        $channel_id_pending_trades: String!
    ) {
    updatealgorithmsCollection(
        filter: {
        and: [
            { algorithm_id: { eq: $algorithm_id } }
            { organization: { eq: $organization } }
        ]
        }
        set: { channel_id_pending_trades: $channel_id_pending_trades }
    ) {
        records {
        algorithm_id
        channel_id_pending_trades
        organization
        }
    }
}`;


