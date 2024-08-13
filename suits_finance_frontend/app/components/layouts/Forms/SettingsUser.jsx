import React, { useState, useEffect, Fragment, useRef } from 'react';
import TabHorizontal from '../../ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import InputFieldDataWrapperUser from '@/app/components/dataWrappers/inputFieldWrapperUser';

import { useUserViewStore, useUserStore } from '@/app/stores/stores';
import ButtonPrimary from '@/app/components/ui/Buttons/ButtonPrimary';
import PayoneerCard from '@/app/components/ui/Cards/PayoneerCard';
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import InputField from '@/app/components/ui/InputFields/InputField';
import { getUserCards, addPayoneerCard, isUserSuperAdmin, addUserRoleObject, IsEmailUniqueRoles } from '@/app/client/supabase/SupabaseUserData';
import { PayoneerCardAddSuccessNotification, AddUserFailedNotification, UserAddedSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import { refreshPage } from '@/app/client/hooks/refreshPage';
import initTranslations from '@/app/i18n';
import ProfileSection from '@/app/components/layouts/Settings/ProfileSection';
import Dropdown from '@/app/components/ui/Dropdowns/Dropdown';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';


export default function SettingsUserLayout() {
    const { view, setCurrentSettingsSection } = useUserViewStore();
    const { user, setEmail, setFullName, setCity, setCountry, setAddressLine1, setAddressLine2, setPostalCode, setState, setCurrency } = useUserStore();

    const [isAdmin, setIsAdmin] = useState(false);
    // permission section usernames
    const [inviteNewEmail, setInviteNewEmail] = useState('');

    const settingOptions = isAdmin ?
        ['Profile', 'Appearance', 'Payoneer', 'Billing', 'Permission'] :
        ['Profile', 'Appearance', 'Payoneer', 'Billing'];

    

    const currencyOptions = [
        '$ USD',
        '€ EUR',
        '£ GBP',
        '¥ YEN',
        '₽ RUB'
    ];

    const roleOptions = [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
        { label: "Super Admin", value: "super_admin" },
        { label: "Developer", value: "developer" },
        { label: "Support", value: "support" }
    ];
    const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
    const [emailUnique, setEmailUnique] = useState(false);



    // translations
    const router = useRouter();
    const [translations, setTranslations] = useState({});
    const { t, i18n } = translations;

    const getLocaleFromQuery = () => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('locale') || router.locale;
        }
        return router.locale;
    };

    useEffect(() => {
        const locale = getLocaleFromQuery();
        const initializeTranslations = async () => {
            const { t, i18n } = await initTranslations(locale, ['settings']);
            setTranslations({ t, i18n });
        };
        initializeTranslations();
    }, [router]);

    useEffect(() => {
        const locale = getLocaleFromQuery();
        if (locale && i18n && i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [router, i18n]);


    useEffect(() => {
        const checkAdmin = async () => {
            const admin = await isUserSuperAdmin({ user_id: user.id });
            setIsAdmin(admin);
        };
        checkAdmin();
    }, [user]);


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

    const isEmailValid = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };


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


    // useEffect the email to check if it is unique
    useEffect(() => {
        const checkEmail = async () => {
            const emailUnique = await IsEmailUniqueRoles({ email: inviteNewEmail });
            setEmailUnique(emailUnique);
        };
        checkEmail();
    }, [inviteNewEmail]);




    const BillingSection = () => (
        <div className="pt-[20px] transition-height">
            <p className="text-base font-medium text-primary select-none">{t && t('billing.title')}</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                {t && t('billing.description')}
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
                                {t && t('billing.personal_info')}
                            </p>
                            <p className="text-xs text-secondary select-none">
                                {userName}
                            </p>
                            <p className="mt-1 text-xs text-secondary">
                                {userEmail}
                            </p>

                            <p className="mt-4 text-sm font-normal text-primary select-none">
                                {t && t('billing.address_info')}
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

            <p className="text-base font-medium text-primary select-none mt-8">
                {t && t('billing.billing_address_title')}
            </p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                {t && t('billing.billing_address_description')}
            </p>
        </div>
    );

    const AppearanceSection = () => (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">{t && t('appearance.title')}</p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                {t && t('appearance.description')}
            </p>

            {/* Language switcher example */}
            {/* <button style={{ backgroundColor: 'red', padding: '10px' }} onClick={() => changeLanguage('en')}>EN</button>
            <button style={{ backgroundColor: 'red', padding: '10px' }} onClick={() => changeLanguage('nl')}>NL</button>
            <button style={{ backgroundColor: 'red', padding: '10px' }} onClick={() => changeLanguage('de')}>DE</button>
            <button style={{ backgroundColor: 'red', padding: '10px' }} onClick={() => changeLanguage('ru')}>RU</button> */}

        </div>
    );

    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardIban, setCardIban] = useState('');
    const { modalRef: modalRef_connectPayoneer, handleOpenModal: handleOpenModal_connectPayoneer } = useModal();
    const handleConnectPayoneer = async () => {
        const result = await addPayoneerCard({
            user_id: user.id,
            card_holder_name: cardHolderName,
            card_iban: cardIban,
            card_expiry: expiryDate
        });
        PayoneerCardAddSuccessNotification();
        refreshPage();
    }

    const handleAddMember = async () => {
        // add member
        console.log('add member');

        const result = await addUserRoleObject({
            email: inviteNewEmail,
            role: selectedRole.value
        });
        console.log(result);

        if (result) {
            UserAddedSuccessNotification();
        }
        else {
            AddUserFailedNotification();
        }


    }


    const isEnabledAddMemberButton = () => {
        return inviteNewEmail && selectedRole && isEmailValid(inviteNewEmail);
    };




    const PermissionSection = () => (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">

                {t && t('permission.title') ? t('permission.title') : <div className="h-[36px] w-[120px]"><SkeletonLoader /></div>}
            </p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">

                {t && t('permission.description') ? t('permission.description') : <div className="h-[36px] w-[120px]"><SkeletonLoader /></div>}
            </p>
        </div>
    );

    const PayoneerSection = () => (
        <div className="pt-[20px]">
            <div className="flex flex-row gap-x-1 justify-between items-center">

                <div className="flex-col flex gap-x-1">
                    <p className="text-base font-medium text-primary select-none">

                        {t && t('payoneer.title') ? t('payoneer.title') : <div className="h-[36px] w-[120px]"><SkeletonLoader /></div>}
                    </p>
                    <p className="mt-1 text-sm font-normal text-secondary select-none">
                        {t && t('payoneer.description') ? t('payoneer.description') : <div className="h-[36px] w-[120px]"><SkeletonLoader /></div>}
                    </p>
                </div>

                <div>
                    <ButtonPrimary label={t && t('payoneer.connect_button')} onClick={handleOpenModal_connectPayoneer} />
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>

            <Modal
                ref={modalRef_connectPayoneer}
                title={t && t('payoneer.modal_title')}
                buttonText={t && t('payoneer.connect_button')}
                onButtonPress={handleConnectPayoneer}>

                <InputField
                    label={t && t('payoneer.card_holder_name')}
                    value={cardHolderName}
                    setValue={setCardHolderName}
                    type='text'
                    width='full'
                />

                <InputField
                    label={t && t('payoneer.iban')}
                    value={cardIban}
                    setValue={setCardIban}
                    type='text'
                    width='full'
                />

                <InputField
                    label={t && t('payoneer.expiry_date')}
                    value={expiryDate}
                    setValue={setExpiryDate}
                    type='text'
                    width='full'
                />

            </Modal>


            <div className="w-full h-full transition-height">
                <h1 className="text-3xl leading-9 text-primary font-bold select-none sm:mt-[20px]">
                    {t && t('title') ? t('title') : <div className="h-[36px] w-[120px]"><SkeletonLoader /></div>}
                </h1>
                <h3 className="text-sm leading-9 text-secondary font-normal select-none">
                    {t && t('subtitle') ? t('subtitle') : <div className="h-[22px] w-[320px] mt-4"><SkeletonLoader /></div>}
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
                {view.currentSettingsSection === 'permission' && <PermissionSection />}

                {view.currentSettingsSection === 'permission' &&
                    <div className="mt-4 bg-secondary p-2 rounded-md border border-primary  sm:pb-[20px]">
                        <div className="flex flex-col gap-y-1">
                            <h3 className="text-sm leading-9 text-primary font-normal select-none px-2">
                                {t && t('permission.invite_new_member_title') ? t('permission.invite_new_member_title') : <div className="h-[22px] w-[320px]"><SkeletonLoader /></div>}
                            </h3>

                            <div className="flex flex-col gap-y-1 sm:flex-row gap-x-1 pr-3 items-center w-full justify-between">
                                <div className="flex flex-col  sm:flex-row  items-center w-full sm:gap-x-4">
                                    <div className="sm:min-w-[300px] w-full sm:max-w-[455px] ml-2 sm:ml-2">
                                        <InputField
                                            label={t && t('permission.email_address') ? t('permission.email_address') : <div className="h-[16px] w-[60px]"><SkeletonLoader /></div>}
                                            value={inviteNewEmail}
                                            setValue={setInviteNewEmail}
                                            type='text'
                                            width='full'
                                        />

                                    </div>
                                    <div className=" ml-2  sm:ml-0 sm:max-w-[200px] w-full mt-4 sm:mt-0">

                                        < Dropdown label='User role' options={roleOptions} width='full' setValue={setSelectedRole}/>
                                    </div>
                                </div>

                                <button onClick={handleAddMember} className={` flex-row flex items-center gap-x-2 p-2 mb-2 sm:mb-0 ml-4 sm:ml-2 rounded-md border mt-6 sm:w-fit text-nowrap w-full ${isEnabledAddMemberButton() ? 'text-white bg-brand-primary hover:transition hover:bg-brand-secondary border-brand-primary' : 'text-gray-300 bg-brand-disabled border-brand-disabled'}`} disabled={!isEnabledAddMemberButton()}>
                                    <div className="flex flex-row gap-x-2 items-center mx-auto">
                                        Add Member
                                        <PaperAirplaneIcon className={`h-6 w-6 ${isEnabledAddMemberButton() ? 'text-white' : 'text-gray-300'}`} />
                                    </div>

                                </button>
                            </div>
                            {!emailUnique && (
                                <p className="text-lg text-red-500 select-none">
                                    Email is not unique
                                </p>
                            )}
                        </div>
                    </div>
                }


                {view.currentSettingsSection === 'payoneer' && (
                    <div className="mt-8">
                        <PayoneerCard />
                    </div>
                )}

                <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-1 transition-all">

                        {view.currentSettingsSection === 'profile' && (
                            <InputFieldDataWrapperUser
                                title={'Full name'}
                                label={'Government Name'}
                                supabaseKey='full_name'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                preSeedValue={user.full_name}
                                setReadOnlyValue={setFullName}
                            />
                        )}
                        {view.currentSettingsSection === 'profile' && (
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
                                preSeedValue={user.email}
                                show={view.currentSettingsSection === 'profile'}
                            />
                        )}
                        {view.currentSettingsSection === 'profile' && (
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
                                preSeedValue={user.country}
                                show={view.currentSettingsSection === 'profile'}
                            />
                        )}
                        {view.currentSettingsSection === 'appearance' && (
                            <TabHorizontal
                                title={'Currency displayed'}
                                label={'This is the currency that will be reflected in your account'}
                                options={currencyOptions}
                                setValueExternal={setCurrency}
                                show={view.currentSettingsSection === 'appearance'}
                            />
                        )}
                    </div>

                    <div className="flex flex-col w-full sm:max-w-[50%] pb-[100px]">
                        {view.currentSettingsSection === 'billing' && (
                            <InputFieldDataWrapperUser
                                label={'Address Line 1'}
                                supabaseKey='address_line_1'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setAddressLine1}
                                preSeedValue={user.address_line_1}
                                show={view.currentSettingsSection === 'billing'}
                            />
                        )}
                        {view.currentSettingsSection === 'billing' && (
                            <InputFieldDataWrapperUser
                                label={'Address Line 2'}
                                supabaseKey='address_line_2'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setAddressLine2}
                                preSeedValue={user.address_line_2}
                                show={view.currentSettingsSection === 'billing'}
                            />
                        )}
                        {view.currentSettingsSection === 'billing' && (
                            <InputFieldDataWrapperUser
                                label={'City'}
                                supabaseKey='city'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setCity}
                                preSeedValue={user.city}
                                show={view.currentSettingsSection === 'billing'}
                            />
                        )}
                        {view.currentSettingsSection === 'billing' && (
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
                                    preSeedValue={user.state}
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
                                    preSeedValue={user.postal_code}
                                    show={view.currentSettingsSection === 'billing'}
                                />
                            </div>
                        )}

                        {view.currentSettingsSection === 'billing' && (
                            <InputFieldDataWrapperUser
                                label={'Country'}
                                supabaseKey='country'
                                disabled={false}
                                type='text'
                                userId={user.id}
                                auditLogRequest={'update_user_metadata'}
                                auditLog={true}
                                setReadOnlyValue={setCountry}
                                preSeedValue={user.country}
                                show={view.currentSettingsSection === 'billing'}
                            />
                        )}

                    </div>



                </div>





            </div>
        </Fragment>
    );
};
