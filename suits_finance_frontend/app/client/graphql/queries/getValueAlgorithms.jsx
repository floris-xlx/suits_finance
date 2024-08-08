import { gql, useQuery } from '@apollo/client';

// query specific value by organization and algorithm id
export const GET_VALUE_DYNAMIC = (dynamicKey) => gql`
    query GetValueDynamic(
        $algorithm_id:String!,
        $organization: String!
    ){
    algorithmsCollection(filter: {
        and: 
        [
            { algorithm_id: { eq: $algorithm_id } }
            { organization: { eq: $organization } }
        ]
    }) {
        edges {
        node {
            algorithm_id
            organization
            ${dynamicKey}
        }
        }
    }
}

`;
