import React, { useState, useEffect, Fragment } from 'react';
import TabHorizontal from '../../ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';


const SettingsUserLayout = ({
    user
}) => {
    const settingOptions = [
        'Profile',
        'Appearance',
        'Account',
        'Billing'
    ];

    const [selectedTab, setSelectedTab] = useState(settingOptions[0]);

    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;

        return true;
    };
    const userRole = isNullOrUndefined(user.role) ? <div className="h-[16px] w-[60px]"><SkeletonLoader /></div> : user.role;
    const userName = isNullOrUndefined(user.username) ? <div className="h-[20px] w-[60px] mb-[2px]"><SkeletonLoader /></div> : user.username;
    const userPicture = isNullOrUndefined(user.profile_picture) ? <div className="h-[64px] w-[64px]"><SkeletonLoader /></div> : <Image src={user.profile_picture} alt="Profile Picture" width={64} height={64} />;
    const userEmail = isNullOrUndefined(user.email) ? <div className="h-[16px] w-[80px]"><SkeletonLoader /></div> : user.email;

    return (
        <Fragment>
            <div className="w-full h-full">
                <h1 className="text-3xl leading-9 text-primary font-bold select-none sm:mt-[20px]">
                    Settings
                </h1>
                <h3 className="text-sm leading-9 text-secondary font-normal select-none">
                    Customize settings, preferences & personal details.
                </h3>

                <TabHorizontal options={settingOptions} setValueExternal={setSelectedTab} />

                <div className="pt-[20px]">
                    <p class="text-base font-medium text-primary select-none">Profile</p>
                    <p class="mt-1 text-sm font-normal text-secondary select-none">
                        This displays your public profile on the site.
                    </p>
                    <div
                        class="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none mt-4 bg-default-100"
                        tabindex="-1"
                    >
                        <div class="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                            <div class="flex items-center gap-4">
                                <div class="relative inline-flex shrink-0">
                                    <span
                                        tabindex="-1"
                                        class="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny rounded-md h-16 w-16"
                                    >
                                        {userPicture}


                                    </span>

                                </div>
                                <div>
                                    <p class="text-sm font-medium text-primary select-none">
                                        {userName}
                                    </p>
                                    <p class="text-xs text-secondary select-none">
                                        {userRole}
                                    </p>
                                    <p class="mt-1 text-xs text-secondary">
                                        {userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SettingsUserLayout;
