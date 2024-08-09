import React, { useState, useEffect } from 'react';

const ButtonIconWithLabel = ({
    label = "Button Label",
    onClick = () => { },
    children,
}) => {
    return (
        <div className="flex flex-col gap-y-1 items-center">
            <button
                onClick={onClick}
                className="bg-secondary border border-primary rounded-md p-2 hover:transition hover:bg-accent">
                {children}
            </button>

            <p className="text-primary text-xs select-none mt-[5px]">
                {label}
            </p>
        </div>
    );
}


export default ButtonIconWithLabel;