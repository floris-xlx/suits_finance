import React, { useState, useEffect, use } from 'react';
import { useUserStore, useFeatureFlagStore } from '@/app/stores/stores';
import { Spinner } from "@nextui-org/react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { UsernameAvailable } from '@/app/client/api/v2/UsernameAvailable';

import { ErrorServerNotification } from "@/app/components/ui/Notifications/Notifications.jsx";
import CenterFull from '@/app/components/ui/Containers/CenterFull';
import XylexNoLink from '@/app/components/ui/Logos/XylexNoLink';
import ProgressDots from '@/app/components/ui/Progress/ProgressDots';
import InputField from '@/app/components/ui/InputFields/InputField';


const NewUserOnboarding = () => {
    const [username, setUsername] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('This username is already taken');
    const [usernameSuccessMessage, setUsernameSuccessMessage] = useState('This username is available');
    const [usernameLoading, setUsernameLoading] = useState(false);

    /// progress dots
    const [progressDots, setProgressDots] = useState(1);


    const errorMessageIllegalCharacters = "Username can only contain letters, numbers, and underscores";

    const { user } = useUserStore();


    const [isViewWelcome, setIsViewWelcome] = useState(true);
    const [isViewSetUsername, setIsViewSetUsername] = useState(false);


    const slideUpClass = "slide-up-element";
    const slideDownClass = "slide-down-element";
    const [classNameGetStarted, setClassNameGetStarted] = useState(null);
    const [classNameSetUsername, setClassNameSetUsername] = useState(null);

    const handleIsViewWelcome = () => {
        setClassNameGetStarted(slideUpClass);

        setTimeout(() => {
            setIsViewWelcome(false);
            setIsViewSetUsername(true);
            setProgressDots(2);
            setClassNameSetUsername(slideDownClass);
        }, 400);
    }

    const handleIsViewSetUsername = () => {
        setClassNameSetUsername(slideUpClass);

        setTimeout(() => {
            setProgressDots(3);
        }, 400);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setUsernameAvailable(false);

            if (doesUsernameContainIllegalCharacters(username)) {
                setUsernameError(true);
                setUsernameErrorMessage(errorMessageIllegalCharacters);
                setUsernameAvailable(false);
                setUsernameLoading(false);
                return;
            } else {
                setUsernameError(false);
                setUsernameErrorMessage('This username is already taken');
            }


            async function checkUsername() {
                setUsernameLoading(true);
                const usernameAvailable = await UsernameAvailable(username);
      
                setUsernameAvailable(usernameAvailable.available);
                setUsernameLoading(false);
                setUsernameError(!usernameAvailable.available);
            }

            if (username.length > 0) {
                checkUsername();
            } else {
                setUsernameAvailable(false);
                setUsernameError(false);
            }

            if (username === "") {
                setUsernameAvailable(false);
                setUsernameError(false);
            }
        }, 250);

        return () => {
            clearTimeout(handler);
        };
    }, [username]);

    useEffect(() => {
        if (username.length > 1) {
        
            setUsernameLoading(true);
        }
    }, [username]);


    const doesUsernameContainIllegalCharacters = (username) => {
        return !/^[a-zA-Z0-9_-]*$/.test(username);
    }


    return (
        <div>

            <CenterFull>
                {isViewWelcome && (
                    <div className={`flex items-center mx-auto w-[375px] sm:w-[500px] flex-col gap-y-3 ${classNameGetStarted}`}>
                        < XylexNoLink size={'lg'} />
                        <p className="text-primary text-4xl font-semibold select-none mt-8">
                            Welcome to Xylex
                        </p>
                        <p className="text-secondary text-sm font-normal select-none text-center">
                            Xylex is an all in one platform for traders. <br />
                            Journal trades, track performance.
                        </p>

                        <button
                            onClick={handleIsViewWelcome}
                            className="bg-brand-primary hover:transition hover:bg-brand-secondary text-white font-semibold rounded-md p-2 px-4 select-none mt-4">
                            Get Started
                        </button>
                    </div>
                )}

                {isViewSetUsername && (
                    <div className={`flex items-center mx-auto w-[375px] sm:w-[500px] flex-col gap-y-3 ${classNameSetUsername}`}>
                        <p className="text-primary text-4xl font-semibold select-none mt-8">
                            What do we call you?
                        </p>
                        <p className="text-secondary text-sm font-normal select-none text-center">
                            Don't worry, you can change this later.
                        </p>

                        <div className="flex flex-row gap-x-1 items-center">
                            <InputField
                                value={username}
                                setValue={setUsername}
                                type="text"
                                width={'210'}
                            />

                            {usernameLoading && (
                                <div className="pt-3  ">

                                    <Spinner color="warning" size="xs" />
                                </div>
                            )}


                            {usernameAvailable && !usernameLoading && (
                                <div className="pt-1 ml-[-10px]">
                                    <CheckCircleIcon className="size-8 text-green" />
                                </div>
                            )}

                            {!usernameLoading && !usernameAvailable && usernameError && (
                                <div className="pt-1 ml-[-10px]">
                                    <XCircleIcon className="size-8 text-red" />
                                </div>
                            )}
                        </div>

                        {usernameError && (
                            <p className="text-red text-sm font-normal select-none text-center mt-[-15px]">
                                {usernameErrorMessage}
                            </p>
                        )}

                        {usernameAvailable && (
                            <p className="text-green text-sm font-normal select-none text-center mt-[-15px]">
                                {usernameSuccessMessage}
                            </p>
                        )}




                        {usernameAvailable && (
                            <button
                                onClick={handleIsViewSetUsername}
                        
                                className={`text-white font-semibold rounded-md p-2 px-4 select-none mt-4 bg-brand-primary hover:transition hover:bg-brand-secondary`}>
                                Continue
                            </button>
                        )}
                    </div>
                )}


            </CenterFull>




            <div style={{
                position: 'absolute',
                top: '95%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <ProgressDots progressDots={progressDots} />
            </div>

        </div>
    )
}

export default NewUserOnboarding;
