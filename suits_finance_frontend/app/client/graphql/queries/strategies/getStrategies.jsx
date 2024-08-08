
import { gql } from '@apollo/client';

// query specific value by organization and algorithm id
export const GET_STRATEGIES = gql`
    query GetStrategies(
        $organization: String!
    ){
    strategiesCollection(filter: {
        and: 
        [{ organization: { eq: $organization } }]
    }) {
        edges {
            node {
                organization,
                user_id,
                strategy_id,
                strategy_hash,
                name,
                description,
                winrate,
                cummulative_pnl,
                total_trades,
                equity_percentage,
                currency,
                pnl
            }
        }
    }
}`;