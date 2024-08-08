import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FeatureFlag {
    isFeatureFlag?: boolean;
    isJournalFlag?: boolean;
    isNewFilteringFlag?: boolean;
}

interface FeatureFlagStore {
    featureFlag?: FeatureFlag;

    // feature flag actions
    setFeatureFlag: (newState: boolean) => void;
    setJournalFlag: (newState: boolean) => void;
    setNewFilteringFlag: (newState: boolean) => void;
}


export const useFeatureFlagStore = create<FeatureFlagStore>()(
    persist(
        (set) => ({
            featureFlag: {
                isFeatureFlag: false,
                isJournalFlag: false,
                isNewFilteringFlag: false

            },

            // set feature flag
            setFeatureFlag: (newState: boolean) => set((state) => ({
                featureFlag: {
                    isFeatureFlag: newState,
                    isJournalFlag: state.featureFlag.isJournalFlag,
                    isNewFilteringFlag: state.featureFlag.isNewFilteringFlag
                }
            })),

            // set journal flag
            setJournalFlag: (newState: boolean) => set((state) => ({
                featureFlag: {
                    isFeatureFlag: state.featureFlag.isFeatureFlag,
                    isJournalFlag: newState,
                    isNewFilteringFlag: state.featureFlag.isNewFilteringFlag
                }
            })),

            // set new filtering flag
            setNewFilteringFlag: (newState: boolean) => set((state) => ({
                featureFlag: {
                    isFeatureFlag: state.featureFlag.isFeatureFlag,
                    isJournalFlag: state.featureFlag.isJournalFlag,
                    isNewFilteringFlag: newState
                }
            }))

        }),
        {
            name: 'feature-flag-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);