import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://kveqccowetyxponzgadz.supabase.co/graphql/v1', // i think we need to add /graphql/v1
    cache: new InMemoryCache(),
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZXFjY293ZXR5eHBvbnpnYWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwOTU4MTUsImV4cCI6MjAzODY3MTgxNX0.6Hc3jQl9my7oovNa22SEGfZfzaYDxTEUn-5RGfCfG0g'
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