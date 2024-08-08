import React from 'react';
import { copyToClipboard } from '@/app/client/hooks/copytoClipboard';
import { roundToTwoDigits, roundToFourDigits } from '@/app/client/hooks/formatting/RoundDigits';


import PropTypes from 'prop-types';

const ValueCopyChip = ({
    value,
    copy = true,
    notificationType,
    triggerNotification,
    isText = false,
    hover = true
}) => {
    const roundedValue = isText ? value : (value < 10 ? roundToFourDigits(value) : roundToTwoDigits(value));
    const displayedValue = isText ? value : roundedValue.toFixed(4);

    if (displayedValue === 'NaN') {
        console.error('Value is not a number');
        return null;
    }

    // this padding is added as a hotfix because the smaller text makes the chips less tall and the card will look weird as result p-[0.285rem]
    // h-[27px] was added as a predaccessor to this as it's a better solution
    // fixes #xlx-1716 by floris
    const fontSize = displayedValue > 1000 || displayedValue.length > 30 ? 'text-[10px] md:text-[11px]' : 'text-[12px] md:text-[14px]';

    return (
        <span className={`border border-primary rounded-md bg-input-primary p-[3px] text-accent text-center ${fontSize} ${hover ? 'cursor-pointer hover:bg-accent' : 'cursor-default'} mt-2 select-none ${hover ? 'hover:transition' : ''} ml-[22px] px-2 min-w-[52px] md:min-w-[64px] w-fit h-[27px] flex items-center`}
            onClick={() => {
                if (copy) {
                    copyToClipboard(
                        value,
                        triggerNotification,
                        notificationType
                    );
                }
            }}
        >
            {value}
        </span>
    )
};

ValueCopyChip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    copy: PropTypes.bool,
    notificationType: PropTypes.string,
    triggerNotification: PropTypes.func,
    isText: PropTypes.bool,
    hover: PropTypes.bool
};

const ValueCopyChipInlineLabel = ({
    value,
    copy = true,
    notificationType,
    triggerNotification,
    label,
    Rr = 0,
    showRr = false,
    isText = false,
    hover = true,
    pips = 0,
    showPips = false,
    width = 110
}) => {
    // if rr or pips is null then default to 0
    if (Rr === null) Rr = 0;
    if (pips === null) pips = 0;


    const roundedValue = isText ? (value === null ? 0 : value) : (typeof value === 'number' && !isNaN(value)) ? (value < 10 ? roundToFourDigits(value) : roundToTwoDigits(value)) : 0;
    const rrValue = isText ? Rr : (Rr === null || isNaN(Rr)) ? 0 : Rr;


    return (
        value !== 0 && (
            <div className='flex flex-row justify-between items-center'>
                <p className={`select-none w-[${width}px] text-[14px] sm:text-[16px] `}>{label}</p>
                <ValueCopyChip
                    value={roundedValue}
                    copy={copy}
                    notificationType={notificationType}
                    triggerNotification={triggerNotification}
                    isText={isText}
                    hover={hover}
                />
                {showRr && (
                    <p className="flex w-fit items-center rounded-md bg-input-primary p-[4px] py-[5px] ml-[3px] text-accent text-center text-[12px] mt-[8px] border border-primary">
                        {rrValue.toFixed(2)}rr
                    </p>
                )}
                {showPips && (
                    <p className="flex w-fit items-center rounded-md bg-input-primary p-[4px] py-[5px] ml-[3px] text-accent text-center text-[12px] mt-[8px] border border-primary">
                        {pips.toFixed(2)} pips
                    </p>
                )}

            </div>
        )

    );

}

export { ValueCopyChip, ValueCopyChipInlineLabel };

ValueCopyChipInlineLabel.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    copy: PropTypes.bool,
    notificationType: PropTypes.string,
    triggerNotification: PropTypes.func,
    label: PropTypes.string,
    Rr: PropTypes.number,
    showRr: PropTypes.bool,
    isText: PropTypes.bool,
    hover: PropTypes.bool,
    pips: PropTypes.number,
    showPips: PropTypes.bool,
    width: PropTypes.number
};