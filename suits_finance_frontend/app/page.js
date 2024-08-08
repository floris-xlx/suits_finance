// journal page
"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import client from "@/app/client/graphql/ApolloClient.jsx";
import {
  ApolloProvider,
  useQuery
} from '@apollo/client';
import {
  TBR_SIGNAL,
  GET_ALERTS
} from "@/app/client/graphql/query.jsx";


import { HeadJournal } from "@/app/components/layouts/Head.jsx";

import RedirectToRoot from "@/app/client/hooks/RedirectToRoot.js";


const Journal = () => {
  const router = useRouter();

  function DisplayTbrSignals() {
    const { loading, error, data } = useQuery(TBR_SIGNAL);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.tradesCollection.edges.map(({ node }) => (

      <div key={node.id}>
        <h3>{node.pairname}</h3>
        <p>{node.trade_hash}</p>
        <p>{node.direction}</p>
        <p>{node.entry_level}</p>
        <p>{node.tp1_level}</p>
        <p>{node.tp2_level}</p>
        <p>{node.tp3_level}</p>
        <p>{node.pending ? "Pending" : "Not Pending"}</p> <br></br>
      </div>
    ));
  }


  function DisplayAlerts() {
    const { loading, error, data } = useQuery(GET_ALERTS);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.alertsCollection.edges.map(({ node }) => (

      <div key={node.id}>
        <h3>{node.symbol}</h3>
        <p>{node.price_level}</p>
        <p>{node.hash}</p>
        <p>{node.user_id}</p> <br></br>
      </div>
    ));
  }

  useEffect(() => {
    router.push('/journal');
  }, [router]);

  const metadata = {
    title: "Xylex",
    description: "Redefining financial markets",
    image: "https://app.suits.finance/og.png",
    url: `https://app.suits.finance`,
  };

  return (
    <>
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@XylexAI" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:site_name" content="Xylex" />
        <meta name="theme-color" content="#7E3AF2" />
      </head>
      {/* handle meta graph and head tags */}
      < HeadJournal />



      {/*   wrapped into the graphql provider client */}
      <ApolloProvider client={client}>

        <div className="bg-primary h-[100vh]">




        </div>


      </ApolloProvider>

    </>
  );
}

export default Journal;