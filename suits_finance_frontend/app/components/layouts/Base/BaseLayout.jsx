import React, { useState, useEffect, Fragment } from 'react';

// ui
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';
import Header from '@/app/components/ui/Headers/Header';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';

// zustand
import {
    useUserStore,
    useLoadingStore,
} from '@/app/stores/stores';

const BaseLayout = ({ children, href = '/settings' }) => {
    // zustand
    const { user } = useUserStore();
    const { loading } = useLoadingStore();

    const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);


    return (
        <div className="w-full h-full flex flex-col bg-primary  min-h-screen">
            <LoggedInUserCard
                username={user.username}
                profilePicture={user.profile_picture}
                setIsPaletteSearchOpen={setIsPaletteSearchOpen}
            />

            <div className="flex-grow">
                {children}
            </div>

            <div className="hidden lg:block">
                <Header setIsPaletteSearchOpen={setIsPaletteSearchOpen} logoHref={href} />
            </div>


            <div className="fixed bottom-0 left-0 p-4 ml-[1px]  ">
                <div className="flex flex-col gap-y-3 items-center">
                    <ThemeButton />
                </div>
            </div>
        </div>
    );
}

export default BaseLayout;