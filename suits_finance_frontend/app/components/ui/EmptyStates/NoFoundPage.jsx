import React from 'react';


const NoFoundPage = () => {
    return (
        <div className="text-center">
            <div>
                <div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-12 w-12 text-brand-primary mx-auto mb-[50px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
                    </svg>

                </div>

                <div>
                    <h3 className="mt-2 text-xl font-medium text-primary select-none">
                        Oops... we couldn't find the page you're looking for
                    </h3>

                </div>
            </div>
        </div>
    );
};

export default NoFoundPage;