import React, { Fragment } from 'react';

const ChartSettingsLayout = ({ children, show = false }) => {
    return (
        <Fragment>
            {show && (
                <div className="flex flex-row gap-x-4 w-full h-full text-primary">
                    {children}

                    chart settings layout
                </div>
            )}
        </Fragment>
    );
}

export default ChartSettingsLayout;