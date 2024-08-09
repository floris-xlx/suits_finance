"use client";


import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./styles.module.css";

import Xylex from "@/app/components/ui/Logos/Xylex.jsx";
import ThemeButton from "@/app/components/ui/Theme/ThemeButton.jsx";
import SignInButton from "@/app/components/ui/Buttons/SignIn.jsx";
import InputFieldRead from "@/app/components/ui/InputFields/InputFieldRead.jsx";

import {
  wrongCredentialsNotification,
  MissingFieldsNotification
} from "@/app/components/ui/Notifications/Notifications.jsx";

// opengraph
import { HeadLogin } from '@/app/components/layouts/OpenGraph/Login';



export default function LoginPage() {
  const router = useRouter();
  const [wrong, setWrong] = useState(false);
  const supabase = createClientComponentClient();
  const [isLoading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false); // [1]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (email.trim() === "" || password.trim() === "") {
      MissingFieldsNotification(); // Call MissingFieldsNotification to show the error message
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // If there's an error, show the error message
      wrongCredentialsNotification(); // Call wrongCredentialsNotification to show the error message
      setLoading(false);

    } else {
      // this dictates where the user goes after success auth

      // THIS SHOULD BE /JOURNAL SOON

      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }

      router.push("/dashboard");

    }
    setWrong(false);
    setAuth(!error);
    router.refresh()
  };



  return (
    <>
      {/* openGraph */}
      < HeadLogin />

      <div className={styles.containerLogin}>
        <div className="flex min-h-full">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="fixed top-0 left-0 p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm z-10">

            </div>

            <div className="mx-auto w-full max-w-sm lg:w-96 SlideInAnimation">
              <div>
                <Xylex size={'lg'} />

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary select-none">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-secondary select-none">
                  Or{" "}
                  <a
                    href="/signup"
                    className="font-medium text-brand-primary hover:text-brand-secondary transition focus:outline-none focus:ring-2   focus:ring-primary rounded-sm select-none"
                  >
                    create your free account
                  </a>
                </p>
              </div>

              <div className="mt-8">

                <div className="mt-6">
                  <form method="POST" action="#" className="space-y-6">


                    < InputFieldRead
                      value={email}
                      setValue={setEmail}
                      label={"Email Address"}
                      type={"email"}
                    />

                    < InputFieldRead
                      value={password}
                      setValue={setPassword}
                      label={"Password"}
                      type={"password"}
                    />


                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <a
                          href="/forgot-password"
                          className="font-medium text-brand-primary hover:text-brand-secondary transition focus:outline-none focus:ring-2 focus:ring-primary rounded-sm select-none"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>

                      <SignInButton
                        handleSignIn={handleSignIn}
                        isLoading={isLoading}
                      />

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