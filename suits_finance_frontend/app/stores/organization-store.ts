import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Organization {
    organization?: string,
    isAdmin?: boolean,
    isMember?: boolean,

}

interface OrganizationStore {
    organization?: Organization;
    org?: Organization;

    // organization actions
    setOrganization: (newOrganization: string) => void;
    setIsAdmin: (newState: boolean) => void;
    setIsMember: (newState: boolean) => void;
}

export const useOrganizationStore = create<OrganizationStore>()(
    persist(
        (set) => ({
            organization: {
                organization: 'Organization Name',
                isAdmin: false,
                isMember: false
            },

            // set organization
            setOrganization: (newOrganization) => set((state) => ({
                organization: {
                    organization: newOrganization,
                    isAdmin: state.organization.isAdmin,
                    isMember: state.organization.isMember
                }
            })),

            // set isAdmin
            setIsAdmin: (newState) => set((state) => ({
                organization: {
                    organization: state.organization.organization,
                    isAdmin: true,
                    isMember: false
                }
            })),

            // set isMember
            setIsMember: (newState) => set((state) => ({
                organization: {
                    organization: state.organization.organization,
                    isAdmin: false,
                    isMember: true
                }
            })),
        }),


        {
            name: 'organization-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);