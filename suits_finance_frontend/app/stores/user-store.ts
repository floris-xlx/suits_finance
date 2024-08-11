import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    id?: string;
    username?: string;
    profile_picture?: string;
    provider_type?: string;
    organization?: string;
    admin?: boolean;
    email?: string;
    role?: string;
    full_name: string;

    // address settings
    country?: string;
    city?: string;
    address_line_1?: string;
    address_line_2?: string;
    postal_code?: string;
    state?: string;

    // view
    currency: string;
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

    setEmail: (email: string) => void;
    setRole: (role: string) => void;
    setFullName: (full_name: string) => void;

    // address actions
    setCountry: (country: string) => void;
    setCity: (city: string) => void;
    setAddressLine1: (address_line_1: string) => void;
    setAddressLine2: (address_line_2: string) => void;
    setPostalCode: (postal_code: string) => void;
    setState: (state: string) => void;

    // misc
    setCurrency: (currency: string) => void;

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
                admin: false,
                email: null,
                role: null,
                full_name: null,
                country: null,
                city: null,
                address_line_1: null,
                address_line_2: null,
                postal_code: null,
                state: null,
                currency: 'EUR'
            },

            // set id
            setId: (id: string) => set((state) => ({
                user: {
                    id: id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

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
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

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
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency


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
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

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
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

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
                    admin: admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set email
            setEmail: (email: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set role
            setRole: (role: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set full name
            setFullName: (full_name: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set country
            setCountry: (country: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set city
            setCity: (city: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set address line 1
            setAddressLine1: (address_line_1: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set address line 2
            setAddressLine2: (address_line_2: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set postal code
            setPostalCode: (postal_code: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: postal_code,
                    state: state.user.state,
                    currency: state.user.currency

                }
            })),

            // set state
            setState: (state_name: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state_name,
                    currency: state.user.currency

                }
            })),

            // set currency
            setCurrency: (currency: string) => set((state) => ({
                user: {
                    id: state.user.id,
                    username: state.user.username,
                    profile_picture: state.user.profile_picture,
                    provider_type: state.user.provider_type,
                    organization: state.user.organization,
                    admin: state.user.admin,
                    email: state.user.email,
                    role: state.user.role,
                    full_name: state.user.full_name,
                    country: state.user.country,
                    city: state.user.city,
                    address_line_1: state.user.address_line_1,
                    address_line_2: state.user.address_line_2,
                    postal_code: state.user.postal_code,
                    state: state.user.state,
                    currency: currency

                }
            })),






            // end of actions
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
)