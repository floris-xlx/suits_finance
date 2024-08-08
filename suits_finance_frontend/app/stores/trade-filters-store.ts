import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TradeFilters {
    // trade filters
    isFilterTradeStatus: boolean;
    isFilterAlgorithmId: boolean;
    isFilterDate: boolean;

    // trade filter values
    isValueTradeStatus: string;
    isValueAlgorithmId: string;
    isValueDate: string;

    // trade log table columns
    isTradeStatusFilters: string | string[];
} 

interface TradeFiltersStore {
    tradeFilters: TradeFilters;

    // trade filters actions
    setIsFilterTradeStatus: (isFilterTradeStatus: boolean) => void;
    setIsFilterAlgorithmId: (isFilterAlgorithmId: boolean) => void;
    setIsFilterDate: (isFilterDate: boolean) => void;

    // trade filter values actions
    setIsValueTradeStatus: (isValueTradeStatus: string) => void;
    setIsValueAlgorithmId: (isValueAlgorithmId: string) => void;
    setIsValueDate: (isValueDate: string) => void;

    // tradelog table
    setIsTradeStatusFilters: (isTradeStatusFilters: string[]) => void;

    // clear all filters
    clearAllFilters: () => void;

}

export const useTradeFiltersStore = create<TradeFiltersStore>()(
    persist(
        (set) => ({
            tradeFilters: {
                isFilterTradeStatus: false,
                isFilterAlgorithmId: false,
                isFilterDate: false,
                isValueTradeStatus: null,
                isValueAlgorithmId: null,
                isValueDate: null,
                isTradeStatusFilters: "all"
            },

            // set filter trade status
            setIsFilterTradeStatus: (isFilterTradeStatus: boolean) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set filter algorithm id
            setIsFilterAlgorithmId: (isFilterAlgorithmId: boolean) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set filter date
            setIsFilterDate: (isFilterDate: boolean) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set value trade status
            setIsValueTradeStatus: (isValueTradeStatus: string) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: isValueTradeStatus, 
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set value algorithm id
            setIsValueAlgorithmId: (isValueAlgorithmId: string) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set value date
            setIsValueDate: (isValueDate: string) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: isValueDate,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            // set trade status filters
            setIsTradeStatusFilters: (isTradeStatusFilters: string[]) => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: state.tradeFilters.isFilterTradeStatus,
                    isFilterAlgorithmId: state.tradeFilters.isFilterAlgorithmId,
                    isFilterDate: state.tradeFilters.isFilterDate,
                    isValueTradeStatus: state.tradeFilters.isValueTradeStatus,
                    isValueAlgorithmId: state.tradeFilters.isValueAlgorithmId,
                    isValueDate: state.tradeFilters.isValueDate,
                    isTradeStatusFilters: isTradeStatusFilters
                }
            })),

            // clear all filters
            clearAllFilters: () => set((state) => ({
                tradeFilters: {
                    isFilterTradeStatus: false,
                    isFilterAlgorithmId: false,
                    isFilterDate: false,
                    isValueTradeStatus: null,
                    isValueAlgorithmId: null,
                    isValueDate: null,
                    isTradeStatusFilters: state.tradeFilters.isTradeStatusFilters
                }
            })),

            


        }),
        {
            name: 'trade-filters-store',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
