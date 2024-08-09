import React from 'react';

const GaugeIcon = (props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            height="1em"
            width="1em"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {' '}

                <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="var(--color-text-primary)"
                    strokeWidth="2"
                ></path>{' '}
                <path
                    d="M7 12C7 9.23858 9.23858 7 12 7"
                    stroke="var(--color-text-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                ></path>{' '}
                <path
                    d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                    stroke="var(--color-text-primary)"
                    strokeWidth="2"
                ></path>{' '}
                <path
                    d="M12 12L16 8"
                    stroke="var(--color-text-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>{' '}
            </g>
        </svg>
    );
};

export default GaugeIcon;
