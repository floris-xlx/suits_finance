import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Loading {
    authLoading?: boolean;
    syncing?: boolean;
    itemsLeft?: number;

    // card loading
    balanceLoading?: boolean;
    transactionsLoading?: boolean;
    cardNumberLoading?: boolean;
    expiryDateLoading?: boolean;
    nameOnCardLoading?: boolean;

}

interface LoadingStore {
    loading?: Loading;

    // loading actions
    setAuthLoading: (loading: boolean) => void;


    // sync actions
    setSyncing: (syncing: boolean) => void;
    setItemsLeft: (itemsLeft: number) => void;
    setBalanceLoading: (loading: boolean) => void;
    setTransactionsLoading: (loading: boolean) => void;
    setCardNumberLoading: (loading: boolean) => void;
    setExpiryDateLoading: (loading: boolean) => void;
    setNameOnCardLoading: (loading: boolean) => void;
    

}

export const useLoadingStore = create<LoadingStore>()(
    persist(
        (set) => ({
            loading: {
                authLoading: true,
                syncing: false,
                setItemsLeft: 0,
                balanceLoading: false,
                transactionsLoading: true,
                cardNumberLoading: true,
                expiryDateLoading: true,
                nameOnCardLoading: true

            },

            // set auth loading
            setAuthLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: loading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),


            // set syncing
            setSyncing: (syncing: boolean) => set((state) => ({
                loading: {
                    syncing: syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),

            // set items left
            setItemsLeft: (itemsLeft: number) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: itemsLeft,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading


                }
            })),

            // set balance loading
            setBalanceLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: loading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),

            // set transactions loading
            setTransactionsLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: loading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),

            // set card number loading
            setCardNumberLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: loading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),

            // set expiry date loading
            setExpiryDateLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: loading,
                    nameOnCardLoading: state.loading?.nameOnCardLoading

                }
            })),

            // set name on card loading
            setNameOnCardLoading: (loading: boolean) => set((state) => ({
                loading: {
                    syncing: state.loading?.syncing,
                    setItemsLeft: state.loading?.itemsLeft || 0,
                    authLoading: state.loading?.authLoading,
                    balanceLoading: state.loading?.balanceLoading,
                    transactionsLoading: state.loading?.transactionsLoading,
                    cardNumberLoading: state.loading?.cardNumberLoading,
                    expiryDateLoading: state.loading?.expiryDateLoading,
                    nameOnCardLoading: loading

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
