import { gql } from '@apollo/client';

// query specific value by organization and algorithm id
export const GET_VALUE_DYNAMIC_TRADES = (dynamicKey) => gql`
    query GetValueDynamic(
        $trade_hash:String!,
    ){
    tradesCollection(filter: {
        and: 
        [
            { trade_hash: { eq: $trade_hash } }
        ]
    }) {
        edges {
        node {
            trade_hash
            ${dynamicKey}
        }
        }
    }
}

`;
