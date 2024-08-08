"use client";


import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Xylex from "@/app/components/ui/Logos/Xylex.jsx";
import ThemeButton from "@/app/components/ui/Theme/ThemeButton.jsx";

export default function LoginPage() {
  const textRef = useRef(null);
  const [discordLink, setDiscordLink] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const discordUrl = queryParams.get('discord_url');
      if (discordUrl) {
        setDiscordLink(discordUrl);
      }
    }
  }, []);

  useEffect(() => {
    if (textRef.current) {
      setTimeout(() => {
        textRef.current.classList.add("active");
      }, 100);
    }
  }, []);

  return (


    <div className={styles.containerLogin}>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    
          <div className="mx-auto w-full max-w-sm lg:w-96 SlideInAnimation">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
                Failed to attach Discord account.
              </h2>
              <h3 className="mt-2 text-md font-medium text-secondary">
                Discord is unable to add your Role as you are not a member of the server, Join the server and try again.
              </h3>


              {discordLink && (
                <a
                  href={discordLink}
                  target="_blank"
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition mt-[30px]"
                >
                  Discord
                </a>
              )}
            </div>


          </div>
        </div>
        <div className="fixed bottom-0 left-0 p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm">
          <ThemeButton />
        </div>

        <div className="relative hidden w-0 flex-1 lg:block border-l border-primary shadow-inner bg-secondary ">
          <div className="absolute top-0 right-0 p-8 SlideInAnimation ">
            <Xylex size={"large"} />
          </div>
        </div>
      </div>
    </div>

  );
}