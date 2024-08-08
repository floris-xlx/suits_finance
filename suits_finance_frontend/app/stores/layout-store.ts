import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Layout {
    isLayoutToPendingTrades?: boolean;
    isLayoutToAlgorithmSettings?: boolean;
    isLayoutToStrategiesOverview?: boolean;
}

interface LayoutStore {
    layout?: Layout;

    // layout actions
    setLayoutToPendingTrades: () => void;
    setLayoutToAlgorithmSettings: () => void;
    setLayoutToStrategiesOverview: () => void;
}

export const useLayoutStore = create<LayoutStore>()(
    persist(
        (set) => ({
            layout: {
                isLayoutToPendingTrades: false,
                isLayoutToAlgorithmSettings: false,
                isLayoutToStrategiesOverview: true
            },

            // set layout to pending trades
            setLayoutToPendingTrades: () => set((state) => ({
                layout: {
                    isLayoutToPendingTrades: true,
                    isLayoutToAlgorithmSettings: false,
                    isLayoutToStrategiesOverview: false
                }
            })),

            // set layout to algorithm settings
            setLayoutToAlgorithmSettings: () => set((state) => ({
                layout: {
                    isLayoutToPendingTrades: false,
                    isLayoutToAlgorithmSettings: true,
                    isLayoutToStrategiesOverview: false
                }
            })),

            // set layout to strategies overview
            setLayoutToStrategiesOverview: () => set((state) => ({
                layout: {
                    isLayoutToPendingTrades: false,
                    isLayoutToAlgorithmSettings: false,
                    isLayoutToStrategiesOverview: true
                }
            }))
        }),
        {
            name: 'layout-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
