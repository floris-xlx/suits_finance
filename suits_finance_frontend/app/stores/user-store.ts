import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id?: string;
    username?: string;
    profile_picture?: string;
    provider_type?: string;
    organization?: string;
    admin?: boolean;
}

interface UserStore {
    user?: User;

    // identification actions
    setId: (id: string) => void;
    setUsername: (username: string) => void;
    setProfilePicture: (profile_picture: string) => void;
    setProviderType: (provider_type: string) => void;
    setOrganization: (organization: string) => void;
    setIsAdmin: (admin: boolean) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {
                id: null,
                username: null,
                profile_picture: null,
                provider_type: null,
                organization: null,
                admin: false
            },

            // set id
            setId: (id: string) => set((state) => ({
                user: {
                    id: id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin
                }
            })),

            // set username
            setUsername: (username: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin
                }
            })),

            // set profile picture
            setProfilePicture: (profile_picture: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin
                }
            })),

            // set provider type
            setProviderType: (provider_type: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin
                }
            })),

            // set organization
            setOrganization: (organization: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: organization,
                    admin: state.user.admin
                }
            })),

            // set admin
            setIsAdmin: (admin: boolean) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: admin
                }
            }))



            // end of actions
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
)