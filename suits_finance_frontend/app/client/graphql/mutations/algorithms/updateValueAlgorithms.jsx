import { gql, useMutation } from '@apollo/client';

// mutate pending trades channel id by organization and algorithm id
export const UPDATE_VALUE_DYNAMIC = (dynamicKey) => gql`
    mutation UpdateValueDynamic(
        $algorithm_id: String!, 
        $organization: String!, 
        $dynamicValue: String!
    ) {
    updatealgorithmsCollection(
        filter: {
        and: [
            { algorithm_id: { eq: $algorithm_id } }
            { organization: { eq: $organization } }
        ]
        }
        set: { ${dynamicKey}: $dynamicValue }
    ) {
        records {
        algorithm_id
        ${dynamicKey}
        organization
        }
    }
}`;


// mutate pending trades channel id by organization and algorithm id
export const UPDATE_BOOL_DYNAMIC = (dynamicKey) => gql`
    mutation UpdateBoolDynamic(
        $algorithm_id: String!, 
        $organization: String!, 
        $dynamicValue: Boolean!
    ) {
    updatealgorithmsCollection(
        filter: {
        and: [
            { algorithm_id: { eq: $algorithm_id } }
            { organization: { eq: $organization } }
        ]
        }
        set: { ${dynamicKey}: $dynamicValue }
    ) {
        records {
        algorithm_id
        ${dynamicKey}
        organization
        }
    }
}`;
