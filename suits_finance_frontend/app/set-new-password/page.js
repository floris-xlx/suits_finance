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
    const supabase = createClientComponentClient();
    const [isLoading, setLoading] = useState(false);  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const invalidCredentials = () => {
        setNotification("MissingPassword");
        setTimeout(() => {
          setNotification(null);
        }, 5500);
    }
    
    const handleSignIn = async (event) => {

      event.preventDefault(); // Prevent the default form submission behavior
      if (password.trim() === "") {
        setNotification("MissingPassword");
        setTimeout(() => {setNotification(null);}, 5500);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase.auth.updateUser(
        {
          password: password
        }
      );
      
  
      if (error) {
        // If there's an error, show the error message
        invalidCredentials(); // Call invalidCredentials to show the error message

      } else {
        // this dictates where the user goes after success auth
        router.push("/journal");
      }
      setLoading(false);
      setWrong(false);
      setAuth(!error);
      router.refresh()
    };
  
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
                  <Xylex /> 
    
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
                   Set a new password
                  </h2>
                  <p className="mt-2 text-sm text-secondary">
                    Or{" "}
                    <a
                      href="/login"
                      className="font-medium text-brand-primary hover:text-brand-secondary transition focus:outline-none focus:ring-2   focus:ring-primary rounded-sm"
                    >
                      login to your existing account
                    </a>
                  </p>
                </div>
    
                <div className="mt-8">
                  <div>
                  </div>
    
                  <div className="mt-6">
                    <form method="POST" action="#" className="space-y-6">
                      
                      
                    <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-secondary"
                        >
                          New Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder=""
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="block w-full appearance-none rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm font-medium"
                          />
                        </div>
                      </div>
    
                      
                       
                      <div>
                      
                        <SignInButton handleSignIn={handleSignIn} isLoading={isLoading} SignInText={"Set new password"} />
                      
                      </div>
                    </form>
                  </div>
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