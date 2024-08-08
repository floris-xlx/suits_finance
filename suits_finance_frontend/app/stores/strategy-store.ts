import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Strategy {
    id?: string;
}

interface StrategyStore {
    strategies?: Strategy;

    // strategy actions
    setId: (id: string) => void;
}


export const useStrategyStore = create<StrategyStore>()(
    persist(
        (set) => ({
            strategies: {
                id: ''
            },

            // set id
            setId: (id) => set((state) => ({
                strategies: {
                    id: id
                }
            }))
        }),

        {
            name: 'strategy-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
