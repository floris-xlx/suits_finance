import { gql } from '@apollo/client';

// query specific value by organization and algorithm id
export const GET_VALUE_USERS = (dynamicKey) => gql`
    query GetValueUsers(
        $user_id:String!
    ){
    usersCollection(filter: {
        and: 
        [
            { user_id: { eq: $user_id } }
        ]
    }) { edges {
        node {
            user_id,
            ${dynamicKey}
        }
        }
    }
}`;
