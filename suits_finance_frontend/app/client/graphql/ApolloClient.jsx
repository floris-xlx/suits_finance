import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://rtqljtumagvoijilxycn.supabase.co/graphql/v1', // i think we need to add /graphql/v1
    cache: new InMemoryCache(),
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cWxqdHVtYWd2b2lqaWx4eWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMDg2ODQsImV4cCI6MjAyMjU4NDY4NH0.KDvFTMpTBelT6vsApqb-r7YlWrersL6k2hEq4VECIRc'
    }
  });


client
  .query({
    query: gql`
        query GetTrades {
            tradesCollection {
                edges {
                    node {
                        trade_hash,
                        pairname
                    }
                }
            } 
        }
    `,
})
.then((result) => console.log(result));


export default client;