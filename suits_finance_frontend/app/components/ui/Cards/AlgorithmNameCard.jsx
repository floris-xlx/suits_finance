import React, { Fragment, useEffect, useState } from 'react';
import AlgoPic from '@/app/components/ui/User/AlgoPic';

import CapitalizeFirstLetter from '@/app/client/hooks/formatting/CapitalizeLetter';

const AlgorithmNameCard = ({
    algorithmName,
    profilePicUrl,
    organization,
}) => {
    return (
        <Fragment>
            <div className="flex items-center justify-start  w-full h-[50px] text-primary select-none py-4 ">
                <div className="flex flex-row gap-x-2 items-center ">
                    <AlgoPic profilePicture={profilePicUrl} />
                    <div>
                        <p className="text-lg font-semibold text-primary">{algorithmName}</p>
                        <p className="text-[13px] text-secondary">{CapitalizeFirstLetter(organization)}</p>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default AlgorithmNameCard;