import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AlgorithmConfigLayout {
    isAdminSettings?: boolean;
    isAlgorithmSettings?: boolean;
    isChartSettings?: boolean;
    isBrandingSettings?: boolean;
    isDiscordSettings?: boolean;
    isMetadata?: boolean;
    isMobile?: boolean;
    isDesktop?: boolean;
}

interface AlgorithmConfigLayoutStore {
    algorithm_config_layout?: AlgorithmConfigLayout;

    // algorithm_config_layout actions
    setLayoutToAdminSettings: () => void;
    setLayoutToAlgorithmSettings: () => void;
    setLayoutToChartSettings: () => void;
    setLayoutToBrandingSettings: () => void;
    setLayoutToDiscordSettings: () => void;
    setLayoutToMetadata: () => void;

    // reset algorithm_config_layout
    resetLayout: () => void;

    // set mobile
    setMobile: () => void;
    setDesktop: () => void;
}

export const useAlgorithmConfigLayoutStore = create<AlgorithmConfigLayoutStore>()(
    persist(
        (set) => ({
            algorithm_config_layout: {
                isAdminSettings: false,
                isAlgorithmSettings: true,
                isChartSettings: false,
                isBrandingSettings: false,
                isDiscordSettings: false,
                isMetadata: false,
                isMobile: false,
                isDesktop: false
            },

            // set layout to admin settings
            setLayoutToAdminSettings: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: true,
                    isAlgorithmSettings: false,
                    isChartSettings: false,
                    isBrandingSettings: false,
                    isDiscordSettings: false,
                    isMetadata: false,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
                }
            })),

            // set layout to algorithm settings
            setLayoutToAlgorithmSettings: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: true,
                    isChartSettings: false,
                    isBrandingSettings: false,
                    isDiscordSettings: false,
                    isMetadata: false,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
                }
            })),

            // set layout to chart settings
            setLayoutToChartSettings: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: false,
                    isChartSettings: true,
                    isBrandingSettings: false,
                    isDiscordSettings: false,
                    isMetadata: false,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
            
                }
            })),

            // set layout to branding settings
            setLayoutToBrandingSettings: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: false,
                    isChartSettings: false,
                    isBrandingSettings: true,
                    isDiscordSettings: false,
                    isMetadata: false,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
                }
            })),

            // set layout to discord settings
            setLayoutToDiscordSettings: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: false,
                    isChartSettings: false,
                    isBrandingSettings: false,
                    isDiscordSettings: true,
                    isMetadata: false,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
                }
            })),

            // set layout to metadata
            setLayoutToMetadata: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: false,
                    isChartSettings: false,
                    isBrandingSettings: false,
                    isDiscordSettings: false,
                    isMetadata: true,
                    isMobile: state.algorithm_config_layout.isMobile,
                    isDesktop: state.algorithm_config_layout.isDesktop
                }
            })),

            // reset algorithm_config_layout
            resetLayout: () => set(() => ({
                algorithm_config_layout: {
                    isAdminSettings: false,
                    isAlgorithmSettings: false,
                    isChartSettings: false,
                    isBrandingSettings: false,
                    isDiscordSettings: false,
                    isMetadata: false,
                    isMobile: false,
                    isDesktop: false
                }
            })),

            // set mobile
            setMobile: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: state.algorithm_config_layout.isAdminSettings,
                    isAlgorithmSettings: state.algorithm_config_layout.isAlgorithmSettings,
                    isChartSettings: state.algorithm_config_layout.isChartSettings,
                    isBrandingSettings: state.algorithm_config_layout.isBrandingSettings,
                    isDiscordSettings: state.algorithm_config_layout.isDiscordSettings,
                    isMetadata: state.algorithm_config_layout.isMetadata,
                    isMobile: true,
                    isDesktop: false
                }
            })),

            // set desktop
            setDesktop: () => set((state) => ({
                algorithm_config_layout: {
                    isAdminSettings: state.algorithm_config_layout.isAdminSettings,
                    isAlgorithmSettings: state.algorithm_config_layout.isAlgorithmSettings,
                    isChartSettings: state.algorithm_config_layout.isChartSettings,
                    isBrandingSettings: state.algorithm_config_layout.isBrandingSettings,
                    isDiscordSettings: state.algorithm_config_layout.isDiscordSettings,
                    isMetadata: state.algorithm_config_layout.isMetadata,
                    isDesktop: true,    
                    isMobile: false
                }
            }))
    
        }),
        {
            name: 'algorithm-config-layout-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
