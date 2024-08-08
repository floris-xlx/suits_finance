import React from 'react';
import { Spinner } from "@nextui-org/react";


const SignInButton = ({
    handleSignIn,
    isLoading,
    SignInText = "Sign in"
}) => {


    return (
        <div>
            {isLoading ? (
                <button
                    type="submit"
                    className="flex w-full justify-center items-center rounded-md border border-transparent bg-brand-disabled py-2 px-4 text-sm font-medium text-white shadow-sm pointer-events-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
                    onClick={handleSignIn}
                >
                <div className="mr-3">
                    <Spinner size="sm" color="secondary" />
                </div>
                    {SignInText}
                </button>
                
            ) : (

                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
                    onClick={handleSignIn}
                >

                    {SignInText}
                </button>
            )}
        </div>
    );
}

export default SignInButton;