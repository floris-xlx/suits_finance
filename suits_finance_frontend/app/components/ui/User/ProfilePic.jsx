import React, { useState, useEffect } from "react";
import { GetProfilePicById, GetUserNameById } from "@/app/client/supabase/SupabaseUserData.js";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";


const ProfilePic = ({
    showUsername = false
}) => {
    const { userId } = useRequireAuth();
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState(null);
    const [username, setUsername] = useState(null);



    useEffect(() => {
        const localProfilePic = GetKeyLocalStorage("profilePic");
        if (localProfilePic !== null) {
            setProfilePic(localProfilePic);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            Promise.all([GetProfilePicById(userId), GetUserNameById(userId)])
                .then(([profilePicData, usernameData]) => {
                    if (profilePicData.length < 10) {
                        return;
                    }

                    SetKeyLocalStorage("profilePic", profilePicData);
                    setProfilePic(profilePicData);
                    setUsername(usernameData);
                    setLoading(false);
                });
        }
    }, [userId]);



    return (
        <div>
            {loading ? (
                <div className="overflow-hidden relative h-[24px] w-[24px] rounded-full background-color-accent shadow-none before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent flex flex-col">
                    <div className="h-6 rounded-lg bg-gray-200"></div>
                </div>
            ) : (

                <div className="mt-2 flex flex-row">
                    <div>
                        <img src={profilePic} alt="Profile" className="h-[24px] w-[24px] rounded-full" />
                    </div>

                    {showUsername && (

                        <div className="flex flex-row items-center justify-content">
                            {loading && (
                                <div className="overflow-hidden relative h-[24px] w-[24px] rounded-full bg-secondary shadow-none before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent flex flex-col">
                                    <div className="h-6 rounded-lg bg-gray-200"></div>
                                </div>
                            )}

                            {!loading && (
                                <div className="ml-2 font-normal text-sm flex items-center justify-content text-primary">
                                    {username}
                                </div>
                            )}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default ProfilePic;