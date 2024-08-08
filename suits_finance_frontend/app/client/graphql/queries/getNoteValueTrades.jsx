import { gql, useQuery } from '@apollo/client';

// query specific value by organization and algorithm id
export const GET_TRADE_NOTE_VALUE = () => gql`
    query GetTradeNoteValue(
        $trade_hash:String!
    ){
    tradesCollection(filter: {
        and: 
        [
            { trade_hash: { eq: $trade_hash } }
        ]
    }) { edges {
        node {
            trade_hash,
            note
        }
        }
    }
}`;
