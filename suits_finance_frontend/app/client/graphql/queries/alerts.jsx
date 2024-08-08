import { gql } from '@apollo/client';

// get all alerts
export const GET_ALERTS = gql`
    query GetAlerts {
        alertsCollection {
            edges {
                node {
                    symbol
                    price_level
                    hash
                    user_id
                }
            }
        }
    }
`;