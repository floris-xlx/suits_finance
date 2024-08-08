import { gql } from '@apollo/client';

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_VALUE_USERS = (dynamicKey) => gql`
    mutation UpdateValueUser(
        $user_id: String!, 
        $dynamicValue: String!
    ) {
    updateusersCollection(
        filter: {
        and: [
            { user_id: { eq: $user_id } }
        ]
        }
        set: { ${dynamicKey}: $dynamicValue }
    ) {
        records {
            user_id,
            ${dynamicKey}
        }
    }
}`;
