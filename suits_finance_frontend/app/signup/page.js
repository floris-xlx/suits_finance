"use client";


import React, { useState, useRef, useEffect } from "react";
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
  const [wrong, setWrong] = useState(false);
  const [auth, setAuth] = useState(false);


  const [isTbrOnboarding, setIsTbrOnboarding] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tbr_onboarding') === 'true') {
      setIsTbrOnboarding(true);
    }
  }, []);


  const invalidCredentials = () => {
    setNotification("InvalidCredentials");
    setTimeout(() => {
      setNotification(null);
    }, 5500);
  }

  const EmailAlreadyExists = () => {
    setNotification("EmailAlreadyExists");
    setTimeout(() => {
      setNotification(null);
    }, 5500);
  }

  const PasswordTooShort = () => {
    setNotification("PasswordTooShort");
    setTimeout(() => {
      setNotification(null);
    }, 5500);
  }



  const handleSignIn = async (event) => {

    event.preventDefault(); // Prevent the default form submission behavior
    if (email.trim() === "" || password.trim() === "") {
      setNotification("MissingFields");
      setTimeout(() => { setNotification(null); }, 5500);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://app.suits.finance/email-verified'
        }
      }
    );



    // handle password too short
    if (error?.message === "Password should be at least 6 characters.") {
      // If the password is too short, show the error message
      PasswordTooShort(); // Call PasswordTooShort to show the error message
      setLoading(false);
    }



    // handle email already exists
    // data.user.identities length is 0 if the users email is already in use
    if (data.user.identities.length === 0) {
      // If the email is already in use, show the error message
      EmailAlreadyExists(); // Call EmailAlreadyExists to show the error message
    }

    // handle success signup
    // data.user.identities length is greater than 0 if the users email is already in use
    if (data.user.identities.length > 0) {
      // If the email is already in use, show the error message
      router.push("/success-signup");
    }



    if (error) {
      // If there's an error, show the error message
      invalidCredentials(); // Call invalidCredentials to show the error message
    } else {
      // this dictates where the user goes after success auth
      // router.push("/success-signup");
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

  const metadata = {
    title: "Xylex",
    description: "Sign up for Xylex",
    image: "https://app.suits.finance/og.png",
    url: `https://app.suits.finance`,
  };

  return (
    <>
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@XylexAI" />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:site_name" content="Xylex" />
        <meta name="theme-color" content="#7E3AF2" />
      </head>

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
                  {isTbrOnboarding ? (
                    "Create an account"
                  ) : (
                    "We're sorry, but we're not accepting new signups at this time."
                  )}


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


                {isTbrOnboarding && (
                  <div className="mt-6">
                    <form method="POST" action="#" className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-secondary"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder=""
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="block w-full appearance-none rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-secondary"
                        >
                          Password
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
                        <SignInButton handleSignIn={handleSignIn} isLoading={isLoading} SignInText={"Create account"} />
                      </div>
                    </form>
                  </div>
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
    </>
  );
}