import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserPreferences {
    showTimeframeOnPendingTrade?: boolean;
    showRrOnPendingTrade?: boolean;
    showPipsAwayOnPendingTrade?: boolean;
    showCurrentPriceOnPendingTrade?: boolean;
    showTimeOnPendingTrade?: boolean;
    showPipsOnPendingTrade?: boolean;
    currency?: string;
}

interface UserPreferencesStore {
    preferences?: UserPreferences;

    // preference actions
    setShowTimeframeOnPendingTrade: (show: boolean) => void;
    setShowRrOnPendingTrade: (show: boolean) => void;
    setShowPipsAwayOnPendingTrade: (show: boolean) => void;
    setShowCurrentPriceOnPendingTrade: (show: boolean) => void;
    setShowTimeOnPendingTrade: (show: boolean) => void;
    setShowPipsOnPendingTrade: (show: boolean) => void;
    setCurrency: (currency: string) => void;
}

export const useUserPreferencesStore = create<UserPreferencesStore>()(
    persist(
        (set) => ({
            preferences: {
                showTimeframeOnPendingTrade: false,
                showRrOnPendingTrade: false,
                showPipsAwayOnPendingTrade: false,
                showCurrentPriceOnPendingTrade: false,
                showTimeOnPendingTrade: false,
                showPipsOnPendingTrade: false,
                currency: 'EUR'
            },

            // set showTimeframeOnPendingTrade
            setShowTimeframeOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    
                    showTimeframeOnPendingTrade: show,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    showPipsOnPendingTrade: state.preferences.showPipsOnPendingTrade,
                    currency: state.preferences.currency
                }
            })),

            // set showRrOnPendingTrade
            setShowRrOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: show,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    showPipsOnPendingTrade: state.preferences.showPipsOnPendingTrade,
                    currency: state.preferences.currency
                }
            })),

            // set showPipsAwayOnPendingTrade
            setShowPipsAwayOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: show,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    showPipsOnPendingTrade: state.preferences.showPipsOnPendingTrade,
                    currency: state.preferences.currency
                }
            })),

            // set showCurrentPriceOnPendingTrade
            setShowCurrentPriceOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: show,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    showPipsOnPendingTrade: state.preferences.showPipsOnPendingTrade,
                    currency: state.preferences.currency
                }
            })),

            // set currency
            setCurrency: (currency: string) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    currency: currency
                }
            })),

            // set show time
            setShowTimeOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: show,
                    showPipsOnPendingTrade: state.preferences.showPipsOnPendingTrade,
                    currency: state.preferences.currency
                }
            })),

            // set show pips
            setShowPipsOnPendingTrade: (show: boolean) => set((state) => ({
                preferences: {
                    showTimeframeOnPendingTrade: state.preferences.showTimeframeOnPendingTrade,
                    showRrOnPendingTrade: state.preferences.showRrOnPendingTrade,
                    showPipsAwayOnPendingTrade: state.preferences.showPipsAwayOnPendingTrade,
                    showCurrentPriceOnPendingTrade: state.preferences.showCurrentPriceOnPendingTrade,
                    showTimeOnPendingTrade: state.preferences.showTimeOnPendingTrade,
                    currency: state.preferences.currency,
                    showPipsOnPendingTrade: show
                }
            }))

            // end of actions
        }),
        {
            name: 'user-preferences-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
