import React, { useState, useEffect, Fragment } from 'react';
import { useUserViewStore, useUserStore } from '@/app/stores/stores';

const ProfileSection = ({ user }) => {
    const { user } = useUserStore();

    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;
    };

    return (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">Profile</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                This displays your public profile on the site.
            </p>

            <div
                className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-md motion-reduce:transition-none mt-4 bg-default-100 border border-primary"
                tabIndex="-1"
            >
                <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                    <div className="flex items-center gap-4">
                        <div className="relative inline-flex shrink-0">
                            <span
                                tabIndex="-1"
                                className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny rounded-md h-16 w-16 select-none"
                            >
                                {userPicture}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary select-none">
                                {userName}
                            </p>
                            <p className="text-xs text-secondary select-none">
                                {userRole}
                            </p>
                            <p className="mt-1 text-xs text-secondary">
                                {userEmail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;