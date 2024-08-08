import React from "react";
import { OpenGraphMeta } from "@/app/components/layouts/OpenGraph/Default.jsx";

// define the metadata for the login page
export const HeadLogin = () => {
  // define the metadata for the login page
  const metadata = {
      title: "Xylex | Login",
      description: "Login to your xylex account.",
      image: "https://app.suits.finance/og.png",
      url: `https://app.suits.finance/login`,
    };
  
  // return the head component
  return (
    <head>
      <meta name="description" content={metadata.description} />
      <meta name="twitter:card" content={OpenGraphMeta.twitter.card}/>
      <meta name="twitter:creator" content={OpenGraphMeta.twitter.creator} />
      <meta name="twitter:image" content={metadata.image} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:type" content={OpenGraphMeta.og.type} />
      <meta property="og:image" content={metadata.image} />
      <meta property="og:site_name" content={OpenGraphMeta.og.site_name}/>
      <meta name="theme-color" content={OpenGraphMeta.theme_color} />
    </head>
  );
}