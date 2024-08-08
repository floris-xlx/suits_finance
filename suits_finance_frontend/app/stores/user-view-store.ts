import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserView {
    isEditingModePendingTrades?: boolean;
    drilldownTradeHashPendingTrades?: string;
    filterTradesByKeyPendingTrades?: string;
    noPendingTrades?: boolean;
    noFilteredTrades?: boolean;
    desktopView?: boolean;
    currentAlgorithmId?: string;
    maxTradeCardsOnViewPort?: number;
    isInDropdownPendingTrades?: boolean;
    isInJournal?: boolean;
    isInDropdownUserSettings?: boolean;
    isInJournalStrategiesOverview?: boolean;
    isInStrategyCreationFlow?: boolean;
    isInStrategyDrilldown?: boolean;
    strategyDrilldownSideBarItem?: string;
    journalEquityChartDateLength?: string;
}

interface UserViewStore {
    view?: UserView;

    // view actions
    setEditingModePendingTrades: (isEditing: boolean) => void;
    setDrilldownTradeHashPendingTrades: (tradeHash: string) => void;
    setFilterTradesByKeyPendingTrades: (filterKey: string) => void;
    setNoPendingTrades: (noPending: boolean) => void;
    setNoFilteredTrades: (noFiltered: boolean) => void;
    setDesktopView: (desktopView: boolean) => void;
    setAlgorithmId: (algorithmId: string) => void;
    setMaxTradeCardsOnViewPort: (maxTradeCards: number) => void;
    setIsInDropdownPendingTrades: (isInDropdown: boolean) => void;
    setIsInJournal: (isInJournal: boolean) => void;
    setIsInDropdownUserSettings: (isInDropdown: boolean) => void;
    setIsInJournalStrategiesOverview: (isInJournal: boolean) => void;
    setIsInStrategyCreationFlow: (isInStrategyCreationFlow: boolean) => void;
    setIsInStrategyDrilldown: (isInStrategyDrilldown: boolean) => void;
    strategyDrilldownSideBarItem?: string;
    setStrategyDrilldownSideBarItem: (sideBarItem: string) => void;
    setJournalEquityChartDateLength: (dateLength: string) => void;
}

export const useUserViewStore = create<UserViewStore>()(
    persist(
        (set) => ({
            view: {
                isEditingModePendingTrades: false,
                drilldownTradeHashPendingTrades: null,
                filterTradesByKeyPendingTrades: 'all',
                noPendingTrades: false,
                noFilteredTrades: false,
                desktopView: true,
                currentAlgorithmId: null,
                maxTradeCardsOnViewPort: 15,
                isInDropdownPendingTrades: false,
                isInJournal: false,
                isInDropdownUserSettings: false,
                isInJournalStrategiesOverview: false,
                isInStrategyCreationFlow: false,
                isInStrategyDrilldown: false,
                strategyDrilldownSideBarItem: null,
                journalEquityChartDateLength: "12_months"

            },

            // set editing mode for pending trades
            setEditingModePendingTrades: (isEditing: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: isEditing,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set drilldown trade hash for pending trades
            setDrilldownTradeHashPendingTrades: (tradeHash: string) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: tradeHash,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set filter trades by key for pending trades
            setFilterTradesByKeyPendingTrades: (filterKey: string) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    filterTradesByKeyPendingTrades: filterKey,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set no pending trades
            setNoPendingTrades: (noPending: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    noPendingTrades: noPending,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength

                }
            })),

            // set no filtered trades
            setNoFilteredTrades: (noFiltered: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    noFilteredTrades: noFiltered,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set desktop view
            setDesktopView: (desktopView: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    desktopView: desktopView,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength

                }
            })),

            // set algorithm id
            setAlgorithmId: (algorithmId: string) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    currentAlgorithmId: algorithmId,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set max trade cards on viewport
            setMaxTradeCardsOnViewPort: (maxTradeCards: number) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: maxTradeCards,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in dropdown pending trades
            setIsInDropdownPendingTrades: (isInDropdown: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: isInDropdown,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in journal
            setIsInJournal: (isInJournal: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in dropdown user settings
            setIsInDropdownUserSettings: (isInDropdown: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: isInDropdown,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in journal strategies overview
            setIsInJournalStrategiesOverview: (isInJournal: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: isInJournal,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in strategy creation flow
            setIsInStrategyCreationFlow: (isInStrategyCreationFlow: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set is in strategy drilldown
            setIsInStrategyDrilldown: (isInStrategyDrilldown: boolean) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set strategy drilldown side bar item
            setStrategyDrilldownSideBarItem: (sideBarItem: string) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: sideBarItem,
                    journalEquityChartDateLength: state.view.journalEquityChartDateLength
                }
            })),

            // set journal equity chart date length
            setJournalEquityChartDateLength: (dateLength: string) => set((state) => ({
                view: {
                    isEditingModePendingTrades: state.view.isEditingModePendingTrades,
                    filterTradesByKeyPendingTrades: state.view.filterTradesByKeyPendingTrades,
                    noPendingTrades: state.view.noPendingTrades,
                    noFilteredTrades: state.view.noFilteredTrades,
                    desktopView: state.view.desktopView,
                    currentAlgorithmId: state.view.currentAlgorithmId,
                    drilldownTradeHashPendingTrades: state.view.drilldownTradeHashPendingTrades,
                    maxTradeCardsOnViewPort: state.view.maxTradeCardsOnViewPort,
                    isInDropdownPendingTrades: state.view.isInDropdownPendingTrades,
                    isInJournal: state.view.isInJournal,
                    isInDropdownUserSettings: state.view.isInDropdownUserSettings,
                    isInJournalStrategiesOverview: state.view.isInJournalStrategiesOverview,
                    isInStrategyCreationFlow: state.view.isInStrategyCreationFlow,
                    isInStrategyDrilldown: state.view.isInStrategyDrilldown,
                    strategyDrilldownSideBarItem: state.view.strategyDrilldownSideBarItem,
                    journalEquityChartDateLength: dateLength
                }
            })),




            // end of actions
        }),
        {
            name: 'user-view-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
