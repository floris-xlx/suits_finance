'use client';

import React from "react";

import NoFoundPage from "./components/ui/EmptyStates/NoFoundPage";
import CenterFull from "./components/ui/Containers/CenterFull";

const NotFound = () => {
    return (
        <div>
            <CenterFull>
                <div className="flex mx-auto flex-col items-center min-w-[300px]">

                <NoFoundPage />
                <a
                    href="/"
                    target={"_self"}
                    type="submit"
                    className={`flex justify-center rounded-md border border-transparent p-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition cursor-pointer select-none hover:bg-brand-secondary gap-x-[5px] items-center bg-brand-primary w-fit mt-[40px]`}

                >
                    Go back to home
                </a>
                </div>
            </CenterFull>
        </div>
    );
}

export default NotFound;