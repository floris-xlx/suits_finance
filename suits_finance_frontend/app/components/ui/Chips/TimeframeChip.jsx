import React from 'react';

import FullCapitalize from '@/app/client/hooks/formatting/FullCapitalize';

const TimeframeChip = ({ timeframe }) => {
    // if the tradeStatus is not int he list make the text ???
    const Text = FullCapitalize(timeframe);

    return (
        <>
            <div className={`flex gap-4 rounded-md py-[3px] px-[7px] w-fit bg-input-primary text-gray-500`}>
                <div className=" text-[12px] font-normal flex flex-row  gap-1 select-none mx-auto">
                    {Text}
                </div>
            </div>






        </>
    );
};

export default TimeframeChip;
