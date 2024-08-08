import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Onboarding {
    isOnboarding?: boolean;
    onboardingProgress?: number;
    onboardingStep?: number;
    isReferree?: boolean;
    isOnboardingNewUser?: boolean;
}

interface OnboardingStore {
    onboarding?: Onboarding;

    // onboarding actions
    setOnboarding: (newState: boolean) => void;
    setOnboardingNewUser: (newState: boolean) => void;
    setOnboardingProgress: (progress: number) => void;
    setOnboardingStep: (step: number) => void;
    setIsReferree: (newState: boolean) => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
    persist(
        (set) => ({
            onboarding: {
                isOnboarding: true,
                onboardingProgress: 0,
                onboardingStep: 1,
                isReferree: false,
                isOnboardingNewUser: true

            },

            // set onboarding
            setOnboarding: (newState: boolean) => set((state) => ({
                onboarding: {
                    isOnboarding: newState,
                    onboardingProgress: state.onboarding.onboardingProgress,
                    onboardingStep: state.onboarding.onboardingStep,
                    isReferree: state.onboarding.isReferree,
                    isOnboardingNewUser: state.onboarding.isOnboardingNewUser
                }
            })),

            // set onboarding progress
            setOnboardingProgress: (progress) => set((state) => ({
                onboarding: {
                    isOnboarding: state.onboarding.isOnboarding,
                    onboardingProgress: progress,
                    onboardingStep: state.onboarding.onboardingStep,
                    isReferree: state.onboarding.isReferree,
                    isOnboardingNewUser: state.onboarding.isOnboardingNewUser
                }
            })),

            // set onboarding step
            setOnboardingStep: (step) => set((state) => ({
                onboarding: {
                    isOnboarding: state.onboarding.isOnboarding,
                    onboardingProgress: state.onboarding.onboardingProgress,
                    onboardingStep: step,
                    isReferree: state.onboarding.isReferree,
                    isOnboardingNewUser: state.onboarding.isOnboardingNewUser
                }
            })),

            // set is referree
            setIsReferree: (newState: boolean) => set((state) => ({
                onboarding: {
                    isOnboarding: state.onboarding.isOnboarding,
                    onboardingProgress: state.onboarding.onboardingProgress,
                    onboardingStep: state.onboarding.onboardingStep,
                    isReferree: newState,
                    isOnboardingNewUser: state.onboarding.isOnboardingNewUser
                }
            })),

            // set is onboarding new user
            setOnboardingNewUser: (newState: boolean) => set((state) => ({
                onboarding: {
                    isOnboarding: state.onboarding.isOnboarding,
                    onboardingProgress: state.onboarding.onboardingProgress,
                    onboardingStep: state.onboarding.onboardingStep,
                    isReferree: state.onboarding.isReferree,
                    isOnboardingNewUser: newState
                }
            }))
            
        }),
        {
            name: 'onboarding-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);