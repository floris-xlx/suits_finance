import React, { Fragment } from 'react';

const BrandingSettingsLayout = ({ children, show = false }) => {
    return (
        <Fragment>
            {show && (
                <div className="flex flex-row gap-x-4 w-full h-full text-primary">
                    {children}

                    branding settings layout
                </div>
            )}
        </Fragment>
    );
}

export default BrandingSettingsLayout;