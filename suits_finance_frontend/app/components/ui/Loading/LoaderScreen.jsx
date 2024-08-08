import React, { Fragment, useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import styles from './styles/styles.LoaderScreen.module.css';
import XylexLogo from "@/app/components/ui/Logos/Xylex.jsx";
import { getTheme, getThemeCookie } from "@/app/client/hooks/darkmode/DarkModeCookie.js";

const LoaderScreen = () => {
  const theme = getThemeCookie();
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";



  return (
    <Fragment>
      {theme === "dark" ? (
        <div className={`PageWrapper bg-black`}>
          <div className={styles.LoadingContainer}>
            <XylexLogo />
            <div className="my-4 w-[50px] h-[50px]"></div>

            <Spinner label="Loading..." color="warning" size="lg" />
            <div className="relative flex w-10 h-10"></div>
          </div>
        </div>
      ) : (
        <div className={`PageWrapper bg-white`}>
          <div className={styles.LoadingContainer}>
            <XylexLogo />
            <div className="my-4 w-[50px] h-[50px]"></div>

            <Spinner label="Loading..." color="warning" size="lg" />
            <div className="relative flex w-10 h-10"></div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default LoaderScreen;
