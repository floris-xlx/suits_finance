import React, { useState, useEffect, Fragment } from 'react';
import { useUserViewStore, useUserStore } from '@/app/stores/stores';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';
import initTranslations from '@/app/i18n';
import { useRouter } from 'next/navigation';



const ProfileSection = () => {
    const router = useRouter();
    const [translations, setTranslations] = useState({});
    const { t, i18n } = translations;
    const { user } = useUserStore();
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

    const changeLanguage = (newLocale) => {
        if (typeof window !== 'undefined') {
            window.location.href = `${window.location.pathname}?locale=${newLocale}`;
        }
    };
    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;
    };

    const userRole = isNullOrUndefined(user.role) ? <div className="h-[16px] w-[60px]"><SkeletonLoader /></div> : user.role;
    const userName = isNullOrUndefined(user.full_name) ? <div className="h-[20px] w-[60px] mb-[2px]"><SkeletonLoader /></div> : user.full_name;
    const userPicture = isNullOrUndefined(user.profile_picture) ? <div className="h-[64px] w-[64px]"><SkeletonLoader /></div> : <Image src={user.profile_picture} alt="Profile Picture" width={64} height={64} />;
    const userEmail = isNullOrUndefined(user.email) ? <div className="h-[16px] w-[80px]"><SkeletonLoader /></div> : user.email;


    return (
        <div className="pt-[20px]">
            <p className="text-base font-medium text-primary select-none">
                {t && t('profile.title') ? t('profile.title') : <div className="h-[16px] w-[80px]"><SkeletonLoader /></div>}
            </p>
            <p className="mt-1 text-sm font-normal text-secondary select-none">
                {t && t('profile.description') ? t('profile.description') : <div className="h-[16px] w-[280px]"><SkeletonLoader /></div>}
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