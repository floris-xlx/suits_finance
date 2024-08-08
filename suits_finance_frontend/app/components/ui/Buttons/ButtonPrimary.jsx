import React, { useState, useEffect } from 'react'
import { Spinner, Button } from '@nextui-org/react';

import PropTypes from 'prop-types';

const ButtonPrimary = ({
    value,
    setValue,
    label,
    loading = false,
    disabled = false,
    onClick = null
}) => {
    const handleButtonClick = async () => {
        if (setValue) {
            setValue(value);
        }

        if (onClick) {
            await onClick();
        }
    }

    console.log(disabled);

    return (
        <div className="w-full flex mx-auto mt-[20px]">
            {!loading ? (

                <Button
                    type="submit"
                    className={`flex w-full justify-center rounded-md border border-transparent p-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition text-white gap-x-[5px] items-center ${disabled ? 'bg-brand-accent cursor-not-allowed !hover:bg-brand-accent ' : 'bg-brand-primary hover:bg-brand-secondary cursor-pointer'}`}
                    onClick={handleButtonClick}

                    value={value}
                    disabled={disabled}
                >
                    {label}
                </Button>

            ) : (
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent p-2 text-sm font-medium text-secondary shadow-sm bg-brand-primary transition text-white gap-x-[5px] items-center  cursor-normal select-none"
                    disabled={true}
                >
                    <Spinner color="secondary" className="pr-2" size="sm" />
                    {label}
                </button>
            )}
        </div>
    )
}

export default ButtonPrimary

ButtonPrimary.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    label: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}