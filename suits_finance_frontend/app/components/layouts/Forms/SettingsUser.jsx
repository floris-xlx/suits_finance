import React, { useState, useEffect, Fragment } from 'react';
import TabHorizontal from '../../ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';

//data
import InputFieldDataWrapperUser from '@/app/components/dataWrappers/inputFieldWrapperUser';

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

    const [testValue, setTestValue] = useState(0);

    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;
    };

    const userRole = isNullOrUndefined(user.role) ? <div className="h-[16px] w-[60px]"><SkeletonLoader /></div> : user.role;
    const userName = isNullOrUndefined(user.full_name) ? <div className="h-[20px] w-[60px] mb-[2px]"><SkeletonLoader /></div> : user.full_name;
    const userPicture = isNullOrUndefined(user.profile_picture) ? <div className="h-[64px] w-[64px]"><SkeletonLoader /></div> : <Image src={user.profile_picture} alt="Profile Picture" width={64} height={64} />;
    const userEmail = isNullOrUndefined(user.email) ? <div className="h-[16px] w-[80px]"><SkeletonLoader /></div> : user.email;

    const ProfileSection = () => (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">Profile</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                This displays your public profile on the site.
            </p>

            <div
                className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-md  motion-reduce:transition-none mt-4 bg-default-100 border border-primary"
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

                {selectedTab === 'profile' && <ProfileSection />}

                <div className="mt-4">

                    <div className="w-full sm:max-w-[300px] flex flex-col gap-y-4">
                        <InputFieldDataWrapperUser
                            label={'Full name'}
                            supabaseKey='full_name'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            show={selectedTab === 'profile'}
                        />

                        <InputFieldDataWrapperUser
                            label={'Email'}
                            supabaseKey='email'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            show={selectedTab === 'profile'}
                        />

                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default SettingsUserLayout;
