import React, { Fragment } from 'react';

const AlgorithmSettingsLayout = ({ children, show = false }) => {
    return (
        <Fragment>
            {show && (
                <div className="flex flex-row gap-x-4 w-full h-full text-primary">
                    {children}

                    <p className="text-primary">
                        algorithms settings layout
                    </p>

                </div>
            )}
        </Fragment>
    );
}

export default AlgorithmSettingsLayout;