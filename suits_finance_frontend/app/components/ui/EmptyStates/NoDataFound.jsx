import React from 'react';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const NoDataFound = () => {
    return (
        <div className="text-center">
            <div>
                <div>
                    < CubeTransparentIcon className="h-12 w-12 text-brand-primary mx-auto" aria-hidden="true" />
                </div>

                <div>
                    <h3 className="mt-2 text-xl font-medium text-primary select-none">
                        No Payoneer cards found
                    </h3>
                    <p className="mt-1 text-sm text-secondary font-normal select-none">
                        As soon as you add a Payoneer card, it will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoDataFound;