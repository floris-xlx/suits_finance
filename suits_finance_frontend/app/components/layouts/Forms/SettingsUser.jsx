import React, { useState, useEffect, Fragment } from 'react';
import TabHorizontal from '../../ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';


const SettingsUserLayout = ({ 
    user
 }) => {
    const settingOptions = ['Profile', 'Appearance', 'Account', 'Billing'];

    const [selectedTab, setSelectedTab] = useState(settingOptions[0]);

    const userRole = (user.role === null || user.role === undefined) ? <div className="h-[36px] w-[152px]"><SkeletonLoader /></div> : user.role;

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
                                        class="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground rounded-full h-16 w-16"
                                    >
                                        <img
                                            src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg"
                                            class="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                            alt="avatar"
                                            data-loaded="true"
                                        ></img>
                                    </span>
                                    <span class="flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 opacity-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 px-1 text-small border-transparent border-0 bg-default text-default-foreground bottom-[10%] right-[10%] translate-x-1/2 translate-y-1/2 w-5 h-5">

                                    </span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-primary">Kate Moore</p>
                                    <p class="text-xs text-secondary select-none">
                                        {userRole}
                                    </p>
                                    <p class="mt-1 text-xs text-secondary">
                                        kate.moore@acme.com
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
