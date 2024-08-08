import React, { Fragment, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const SettingsCard = ({ children }) => {
    return (
        <Fragment>
            <div className="flex flex-col md:max-w-[320px] w-full h-full bg-secondary rounded-lg select-none border border-primary ml-1">
                <div className="flex flex-col gap-y-2">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

export default SettingsCard;