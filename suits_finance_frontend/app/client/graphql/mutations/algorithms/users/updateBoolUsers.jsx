import { gql } from '@apollo/client';

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_BOOL_USERS = (dynamicKey) => gql`
    mutation UpdateBoolUsers(
        $user_id: String!, 
        $dynamicValue: Boolean!
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
