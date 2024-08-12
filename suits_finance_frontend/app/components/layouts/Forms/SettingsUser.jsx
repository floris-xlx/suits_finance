import React, { useState, useEffect, Fragment, useRef } from 'react';
import TabHorizontal from '../../ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';

// Data
import InputFieldDataWrapperUser from '@/app/components/dataWrappers/inputFieldWrapperUser';
import convertCurrencyToSymbol from '@/app/client/hooks/formatting/CurrencySymbol';
import { useUserViewStore, useUserStore } from '@/app/stores/stores';
import ButtonPrimary from '@/app/components/ui/Buttons/ButtonPrimary';
import { PayoneerIcon } from '@/app/components/ui/Icon';

const SettingsUserLayout = () => {
    const { view, setCurrentSettingsSection } = useUserViewStore();
    const { user, setEmail, setFullName, setRole, setProfilePicture, setCity, setCountry, setAddressLine1, setAddressLine2, setPostalCode, setState, setCurrency } = useUserStore();

    const settingOptions = [
        'Profile', 'Appearance', 'Payoneer', 'Billing'
    ];

    const currencyOptions = [
        '$ USD',
        '€ EUR',
        '£ GBP',
        '¥ YEN',
        '₽ RUB'
    ];

    // Chore:
    // add user team management for inviting by email, removing, and changing roles
    // allow for role changing in db by dev or super admin
    // add billing section for changing payment methods, viewing the 1% fee
    // add table fo members of team with roles and emails
    // add table for billing history
    // only show for super admin and dev
    // show in billing the current rate of 1% fee


    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;
    };

    const userRole = isNullOrUndefined(user.role) ? <div className="h-[16px] w-[60px]"><SkeletonLoader /></div> : user.role;
    const userName = isNullOrUndefined(user.full_name) ? <div className="h-[20px] w-[60px] mb-[2px]"><SkeletonLoader /></div> : user.full_name;
    const userPicture = isNullOrUndefined(user.profile_picture) ? <div className="h-[64px] w-[64px]"><SkeletonLoader /></div> : <Image src={user.profile_picture} alt="Profile Picture" width={64} height={64} />;
    const userEmail = isNullOrUndefined(user.email) ? <div className="h-[16px] w-[80px]"><SkeletonLoader /></div> : user.email;

    const [showCountry, setShowCountry] = useState(true);
    const [showCity, setShowCity] = useState(true);
    const [showAddressLine1, setShowAddressLine1] = useState(true);
    const [showAddressLine2, setShowAddressLine2] = useState(true);
    const [showPostalCode, setShowPostalCode] = useState(true);
    const [showState, setShowState] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (isNullOrUndefined(user.country)) setShowCountry(false);
            if (isNullOrUndefined(user.city)) setShowCity(false);
            if (isNullOrUndefined(user.address_line_1)) setShowAddressLine1(false);
            if (isNullOrUndefined(user.address_line_2)) setShowAddressLine2(false);
            if (isNullOrUndefined(user.postal_code)) setShowPostalCode(false);
            if (isNullOrUndefined(user.state)) setShowState(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [user]);

    const containerRef = useRef(null);

    const userCountry = isNullOrUndefined(user.country) ? (showCountry && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.country;
    const userCity = isNullOrUndefined(user.city) ? (showCity && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.city;
    const userAddressLine1 = isNullOrUndefined(user.address_line_1) ? (showAddressLine1 && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.address_line_1;
    const userAddressLine2 = isNullOrUndefined(user.address_line_2) ? (showAddressLine2 && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.address_line_2;
    const userPostalCode = isNullOrUndefined(user.postal_code) ? (showPostalCode && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.postal_code;
    const userState = isNullOrUndefined(user.state) ? (showState && <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>) : user.state;

    const ProfileSection = () => (
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

    const BillingSection = () => (
        <div className="pt-[20px] transition-height">
            <p className="text-base font-medium text-primary select-none">Billing</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                This displays your billing information.
            </p>

            <div
                ref={containerRef}
                className="flex flex-col relative text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-md motion-reduce:transition-none mt-4 bg-default-100 border border-primary overflow-hidden transition-height duration-300 ease-in-out"
                style={{ maxHeight: '500px' }}
                tabIndex="-1"
            >
                <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-sm font-normal text-primary select-none">
                                Personal Information
                            </p>
                            <p className="text-xs text-secondary select-none">
                                {userName}
                            </p>
                            <p className="mt-1 text-xs text-secondary">
                                {userEmail}
                            </p>

                            <p className="mt-4 text-sm font-normal text-primary select-none">
                                Address Information
                            </p>

                            {userAddressLine1 && <p className="mt-1 text-xs text-secondary">{userAddressLine1}</p>}
                            {userAddressLine2 && <p className="mt-1 text-xs text-secondary">{userAddressLine2}</p>}
                            {userCity && <p className="mt-1 text-xs text-secondary">{userCity}</p>}
                            {userState && <p className="mt-1 text-xs text-secondary">{userState}</p>}
                            {userPostalCode && <p className="mt-1 text-xs text-secondary">{userPostalCode}</p>}
                            {userCountry && <p className="mt-1 text-xs text-secondary">{userCountry}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-base font-medium text-primary select-none mt-8">Billing Address</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                This billing address is used for your invoices.
            </p>
        </div>
    );

    const AppearanceSection = () => (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">Appearance</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                This displays your appearance settings.
            </p>
        </div>
    );

    const PayoneerSection = () => (
        <div className="pt-[20px]">
            <div className="flex flex-row gap-x-1 justify-between items-center">
                
                <div className="flex-col flex gap-x-1">
                    <p className="text-base font-medium text-primary select-none">Payoneer</p>
                    <p className="mt-1 text-sm font-normal text-secondary select-none">
                        This displays your Payoneer settings and it's details.
                    </p>
                </div>

                <div>
                    < ButtonPrimary label={'Connect Payoneer'} onClick={() => { }} />

                </div>


            </div>
        </div>
    );

    return (
        <Fragment>
            <div className="w-full h-full transition-height">
                <h1 className="text-3xl leading-9 text-primary font-bold select-none sm:mt-[20px]">
                    Settings
                </h1>
                <h3 className="text-sm leading-9 text-secondary font-normal select-none">
                    Customize settings, preferences & personal details.
                </h3>

                <TabHorizontal
                    options={settingOptions}
                    setValueExternal={setCurrentSettingsSection}
                    preSetValue={view.currentSettingsSection}
                />

                {view.currentSettingsSection === 'profile' && <ProfileSection />}
                {view.currentSettingsSection === 'billing' && <BillingSection />}
                {view.currentSettingsSection === 'appearance' && <AppearanceSection />}
                {view.currentSettingsSection === 'payoneer' && <PayoneerSection />}

                <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-1 transition-all">

                        <InputFieldDataWrapperUser
                            title={'Full name'}
                            label={'Government Name'}
                            supabaseKey='full_name'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            show={view.currentSettingsSection === 'profile'}
                            setReadOnlyValue={setFullName}
                        />

                        <InputFieldDataWrapperUser
                            title={'Email Address'}
                            label={'Email linked to your account'}
                            supabaseKey='email'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setEmail}
                            show={view.currentSettingsSection === 'profile'}
                        />

                        <InputFieldDataWrapperUser
                            title={'Country'}
                            label={'The country you are tax liable'}
                            supabaseKey='country'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setCountry}
                            show={view.currentSettingsSection === 'profile'}
                        />

                        <TabHorizontal
                            title={'Currency displayed'}
                            label={'This is the currency that will be reflected in your account'}
                            options={currencyOptions}
                            setValueExternal={setCurrency}
                            show={view.currentSettingsSection === 'appearance'}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:max-w-[50%] pb-[100px]">
                        <InputFieldDataWrapperUser
                            label={'Address Line 1'}
                            supabaseKey='address_line_1'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setAddressLine1}
                            show={view.currentSettingsSection === 'billing'}
                        />

                        <InputFieldDataWrapperUser
                            label={'Address Line 2'}
                            supabaseKey='address_line_2'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setAddressLine2}
                            show={view.currentSettingsSection === 'billing'}
                        />

                        <InputFieldDataWrapperUser
                            label={'City'}
                            supabaseKey='city'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setCity}
                            show={view.currentSettingsSection === 'billing'}
                        />

                        <div className="flex flex-row gap-x-2 w-full justify-between">
                            <InputFieldDataWrapperUser
                                label={'State / Province'}
                                supabaseKey='state'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setState}

                                show={view.currentSettingsSection === 'billing'}
                            />
                            <InputFieldDataWrapperUser
                                label={'Postal code'}
                                supabaseKey='postal_code'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setPostalCode}
                                show={view.currentSettingsSection === 'billing'}
                            />
                        </div>

                        <InputFieldDataWrapperUser
                            label={'Country'}
                            supabaseKey='country'
                            disabled={false}
                            type='text'
                            userId={user.id}
                            auditLogRequest={'update_user_metadata'}
                            auditLog={true}
                            setReadOnlyValue={setCountry}
                            show={view.currentSettingsSection === 'billing'}
                        />

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SettingsUserLayout;
