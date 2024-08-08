import React, { Fragment } from "react";
import { HandThumbDownIcon } from '@heroicons/react/24/outline';

const JournalNotEnabled = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            < HandThumbDownIcon className="text-brand-primary w-12 h-12 mb-7" />
            <div className="text-2xl text-primary font-bold">Journal is not enabled for your account</div>
            <div className="text-[14px] text-secondary font-bold">Please contact your organization admin to enable Journal</div>

            <a href="/" className="bg-input-primary hover:transition hover:bg-hover-primary rounded-md p-2 mt-8">
                <p className="text-primary">Go to Home </p>
            </a>
        </div>
    )
}

export default JournalNotEnabled;