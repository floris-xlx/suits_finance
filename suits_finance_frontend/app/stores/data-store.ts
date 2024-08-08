import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Data {
    pendingTrades?: any[];
    scopedPendingHash?: string;
    strategies?: any[];
}

interface DataStore {
    data?: Data;

    // data actions
    setPendingTradesZustand: (trades: any[]) => void;
    setScopedPendingHash: (hash: string) => void;
    clearPendingTrades: () => void;

    setStrategies: (strategies: any[]) => void;
}

export const useDataStore = create<DataStore>()(
    persist(
        (set) => ({
            data: {
                pendingTrades: [],
                scopedPendingHash: '',
                strategies: []
            },

            // set pending trades
            setPendingTradesZustand: (trades: any[]) => set((state) => ({
                data: {
                    strategies: state.data.strategies,
                    pendingTrades: trades,
                    scopedPendingHash: state.data.scopedPendingHash,
                }
            })),

            // set scoped pending hash
            setScopedPendingHash: (hash: string) => set((state) => ({
                data: {
                    strategies: state.data.strategies,
                    scopedPendingHash: hash,
                    pendingTrades: state.data.pendingTrades
                }
            })),

            // clear pending trades
            clearPendingTrades: () => set((state) => ({
                data: {
                    strategies: state.data.strategies,
                    pendingTrades: [],
                    scopedPendingHash: ''
                }
            })),

            // set strategies
            setStrategies: (strategies: any[]) => set((state) => ({
                data: {
                    pendingTrades: state.data.pendingTrades,
                    strategies: strategies,
                    scopedPendingHash: state.data.scopedPendingHash
                }
            }))

            // end of actions
        }),
        {
            name: 'data-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
