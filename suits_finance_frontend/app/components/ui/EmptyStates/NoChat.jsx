import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';


const NoChat = ({
    show = true,
    text = "No chat messages yet"
}) => {

    if (!show) { return null; }

    return (
        <div >
            <div className="w-fit flex-row flex mx-auto items-center gap-x-2 py-6 ">
                <InformationCircleIcon className="h-6 w-6 icon" />
                <h1 className="text-secondary select-none">
                    {text}
                </h1>
            </div>

        </div>
    );
}

export default NoChat;