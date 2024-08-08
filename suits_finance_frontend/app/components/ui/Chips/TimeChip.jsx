import React from 'react';

const TimeChip = ({
    time,
    show = true
}) => {
    if (!show) return null;

    const date = new Date(time);
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).replace(',', '');

    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-row justify-between items-center">
                <p className="select-none w-[110px]">
                    Time
                </p>
                <span
                    className="rounded-md border border-primary bg-input-primary p-[3px] text-accent text-center text-[12px] md:text-[14px] mt-2 select-none ml-[22px] px-2 w-fit h-[27px] flex items-center"
                >
                    {formattedDate}
                </span>
            </div>
        </div>
    );
}

export default TimeChip;