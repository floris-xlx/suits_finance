import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Loading {
    authLoading?: boolean;
    pendingTradesLoading?: boolean;
    syncing?: boolean;
    itemsLeft?: number;
}

interface LoadingStore {
    loading?: Loading;

    // loading actions
    setAuthLoading: (loading: boolean) => void;
    setPendingTradesLoading: (loading: boolean) => void;

    // sync actions
    setSyncing: (syncing: boolean) => void;
    setItemsLeft: (itemsLeft: number) => void;

}

export const useLoadingStore = create<LoadingStore>()(
    persist(
        (set) => ({
            loading: {
                authLoading: true,
                pendingTradesLoading: true,
                syncing: false,
                setItemsLeft: 0
            },

            // set auth loading
            setAuthLoading: (loading: boolean) => set((state) => ({
                loading: {
                    pendingTradesLoading: state.loading?.pendingTradesLoading,
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: loading
                }
            })),

            // set pending trades loading
            setPendingTradesLoading: (loading: boolean) => set((state) => ({
                loading: {
                    pendingTradesLoading: loading,
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading
                }
            })),

            // set syncing
            setSyncing: (syncing: boolean) => set((state) => ({
                loading: {
                    pendingTradesLoading: state.loading?.pendingTradesLoading,
                    syncing: syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading
                }
            })),

            // set items left
            setItemsLeft: (itemsLeft: number) => set((state) => ({
                loading: {
                    pendingTradesLoading: state.loading?.pendingTradesLoading,
                    syncing: state.loading?.syncing,
                    setItemsLeft: itemsLeft,
                    authLoading: state.loading?.authLoading
                }
            })),


            // end of actions
        }),
        {
            name: 'loading-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
