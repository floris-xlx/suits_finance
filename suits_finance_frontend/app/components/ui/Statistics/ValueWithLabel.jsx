import React from 'react';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader.jsx';


import PropTypes from 'prop-types';

const SkeletonValue = () => (
    <div className="flex w-[140px] h-[40px]">
        <SkeletonLoader width={"full"} height={"full"} />
    </div>
);


const ValueWithLabel = ({
    value = 0,
    label = "Label",
    valueSuffix = null,
    showDecimal = true,
}) => {

    const isValueLoading = value === undefined || value === null;

    let formattedValue = 0;
    if (value !== undefined && value !== null) {
        formattedValue = showDecimal ? value.toFixed(2) : value;
    }

    if (isValueLoading) {
        return (
            <div className="flex flex-col rounded-md h-full w-full">
                <p className="text-secondary text-[16px] px-2 pt-2 select-none">
                    {label}
                </p>
                <SkeletonValue />
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-md h-full w-full">
            <p className="text-secondary text-[16px] px-2 pt-2 select-none">
                {label}
            </p>
            <div className="text-primary text-4xl font-semibold px-2 select-none">
                {formattedValue}{valueSuffix}
            </div>
        </div>
    );
}

export default ValueWithLabel;

ValueWithLabel.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    valueSuffix: PropTypes.string,
    showDecimal: PropTypes.bool,
};