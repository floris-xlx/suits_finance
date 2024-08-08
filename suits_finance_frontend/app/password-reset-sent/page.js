"use client";


import React, {useState, useRef,useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./styles.module.css";

import Popup from "@/app/components/ui/Notifications/Popup.jsx";
import Xylex from "@/app/components/ui/Logos/Xylex.jsx";
import ThemeButton from "@/app/components/ui/Theme/ThemeButton.jsx";
import SignInButton from "@/app/components/ui/Buttons/SignIn.jsx";

import {
    DiscordIcon,
    GoogleIcon
} from "@/app/components/ui/Icon.jsx";


export default function LoginPage() {
    const [notification, setNotification] = useState(null);
    const textRef = useRef(null);
    const router = useRouter();

    const [countdown, setCountdown] = useState(5);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {

                if (prevCountdown <= 1) {
                    clearInterval(interval);
                    router.push('/login');
                    return 0;
                }

                return prevCountdown - 1;
            });
        }, 1000);

      return () => clearInterval(interval);
    }, []);


    useEffect(() => {
      if (textRef.current) {
        setTimeout(() => {
          textRef.current.classList.add("active");
        }, 100);
      }
    }, []);

    return (
        <>
    
         <div className={styles.containerLogin}>
         <div className="flex min-h-full">
            <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">    
            <div className="fixed top-0 left-0 p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm z-10">
              <Popup messageType={notification} />
            </div>

              <div className="mx-auto w-full max-w-sm lg:w-96 SlideInAnimation">
                <div>
           
    
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
                   The password reset link has been sent to your email.
                  </h2>
                  <p className="mt-2 text-sm text-secondary">
                    We're redirecting you back to the login in{" "}
                    <a
                      href="/login"
                      className="font-medium text-brand-primary hover:text-brand-secondary transition focus:outline-none focus:ring-2   focus:ring-primary rounded-sm"
                    >
                      {countdown} second{countdown > 1 ? "s" : ""}
                    </a>
                  </p>
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
        </>
    );
}