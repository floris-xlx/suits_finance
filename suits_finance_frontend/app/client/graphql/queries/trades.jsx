import { gql } from '@apollo/client';

// tbr signal
export const TBR_SIGNAL = gql`
    query GetTbrSignal {
        tradesCollection(last: 1) {
            edges {
                node {
                    trade_hash
                    tp1_level
                    tp2_level
                    tp3_level
                    pairname
                    pending
                }
            }
        }
    }
`;