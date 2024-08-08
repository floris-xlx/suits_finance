import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Algorithm {
    // metadata
    name?: string;
    organization?: string; // (admin only)
    algorithm_id?: string; // (admin only)
    profile_picture?: string;
    author?: string;
    footer?: string; // (admin only)
    channel_id_dev?: number; // (admin only)
    promote_url?: string;

    // naming conventions
    naming_ai_summary?: string;
    naming_entry_level?: string;
    naming_take_profit_level?: string;
    naming_stoploss_level?: string;

    // show boolean
    show_rr_tp?: boolean;
    show_pips_tp?: boolean;
    show_pips_sl?: boolean;

    // chart settings
    show_chart?: boolean;
    chart_auto_update?: boolean;
    chart_blur_free_signals?: boolean;
    chart_bull_candle_color?: string;
    chart_bear_candle_color?: string;

    // signal settings
    ping_signal?: boolean;
    ping_trade_update?: boolean;
    ping_role_id_signal?: string;

    // pending trades settings
    pending_trades_auto_update?: boolean;
    pending_trades?: boolean;

    // channel ids ( make some backend verifier that checks if this is the permitted guild id)
    channel_id_pending_trades?: number;
    channel_id_patch_notes?: number;
    channel_id_chatbot?: number;
    channel_id_free_signals?: number;
    channel_id_signals?: number;
    channel_id_pre_approve?: number;
    channel_id_results?: number;

    // guild ids  ( make some backend verifier that checks if this is the permitted guild id)
    guild_id_dev?: number; // (admin only)
    guild_id?: string; // (admin only)

    // global settings
    safe_mode?: boolean; // (admin only)
    signal_auto_approve?: boolean;
    bot_id?: string; // (admin only)

    // caching keys
    pending_last_update?: string; // (admin only)
}

interface AlgorithmStore {
    algorithm?: Algorithm;

    // set functions
    setName: (name: string) => void;
    setOrganization: (organization: string) => void;
    setAlgorithmId: (algorithm_id: string) => void;
    setProfilePicture: (profile_picture: string) => void;
    setAuthor: (author: string) => void;
    setFooter: (footer: string) => void;
    setChannelIdDev: (channel_id_dev: number) => void;
    setPromoteUrl: (promote_url: string) => void;
    setNamingAiSummary: (naming_ai_summary: string) => void;
    setNamingEntryLevel: (naming_entry_level: string) => void;
    setNamingTakeProfitLevel: (naming_take_profit_level: string) => void;
    setNamingStoplossLevel: (naming_stoploss_level: string) => void;
    setShowRrTp: (show_rr_tp: boolean) => void;
    setShowPipsTp: (show_pips_tp: boolean) => void;
    setShowPipsSl: (show_pips_sl: boolean) => void;
    setShowChart: (show_chart: boolean) => void;
    setChartAutoUpdate: (chart_auto_update: boolean) => void;
    setChartBlurFreeSignals: (chart_blur_free_signals: boolean) => void;
    setChartBullCandleColor: (chart_bull_candle_color: string) => void;
    setChartBearCandleColor: (chart_bear_candle_color: string) => void;
    setPingSignal: (ping_signal: boolean) => void;
    setPingTradeUpdate: (ping_trade_update: boolean) => void;
    setPingRoleIdSignal: (ping_role_id_signal: string) => void;
    setPendingTradesAutoUpdate: (pending_trades_auto_update: boolean) => void;
    setPendingTrades: (pending_trades: boolean) => void;
    setChannelIdPendingTrades: (channel_id_pending_trades: number) => void;
    setChannelIdPatchNotes: (channel_id_patch_notes: number) => void;
    setChannelIdChatbot: (channel_id_chatbot: number) => void;
    setChannelIdFreeSignals: (channel_id_free_signals: number) => void;
    setChannelIdSignals: (channel_id_signals: number) => void;
    setChannelIdPreApprove: (channel_id_pre_approve: number) => void;
    setChannelIdResults: (channel_id_results: number) => void;
    setGuildIdDev: (guild_id_dev: number) => void;
    setGuildId: (guild_id: string) => void;
    setSafeMode: (safe_mode: boolean) => void;
    setSignalAutoApprove: (signal_auto_approve: boolean) => void;
    setBotId: (bot_id: string) => void;
    setPendingLastUpdate: (pending_last_update: string) => void;
}

export const useAlgorithmStore = create<AlgorithmStore>()(
    persist(
        (set) => ({
            algorithm: {
                name: null,
                organization: null,
                algorithm_id: null,
                profile_picture: null,
                author: null,
                footer: null,
                channel_id_dev: null,
                promote_url: null,
                naming_ai_summary: null,
                naming_entry_level: null,
                naming_take_profit_level: null,
                naming_stoploss_level: null,
                show_rr_tp: null,
                show_pips_tp: null,
                show_pips_sl: null,
                show_chart: null,
                chart_auto_update: null,
                chart_blur_free_signals: null,
                chart_bull_candle_color: null,
                chart_bear_candle_color: null,
                ping_signal: null,
                ping_trade_update: null,
                ping_role_id_signal: null,
                pending_trades_auto_update: null,
                pending_trades: null,
                channel_id_pending_trades: null,
                channel_id_patch_notes: null,
                channel_id_chatbot: null,
                channel_id_free_signals: null,
                channel_id_signals: null,
                channel_id_pre_approve: null,
                channel_id_results: null,
                guild_id_dev: null,
                guild_id: null,
                safe_mode: null,
                signal_auto_approve: null,
                bot_id: null,
                pending_last_update: null,
            },

            // set functions
            setName: (name: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        name 
                    },
                })),
            setOrganization: (organization: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        organization 
                    },
                })),
            setAlgorithmId: (algorithm_id: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        algorithm_id 
                    },
                })),
            setProfilePicture: (profile_picture: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        profile_picture 
                    },
                })),
            setAuthor: (author: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, author },
                })),
            setFooter: (footer: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        footer 
                    },
                })),
            setChannelIdDev: (channel_id_dev: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_dev 
                    },
                })),
            setPromoteUrl: (promote_url: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        promote_url 
                    },
                })),
            setNamingAiSummary: (naming_ai_summary: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        naming_ai_summary 
                    },
                })),
            setNamingEntryLevel: (naming_entry_level: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        naming_entry_level 
                    },
                })),
            setNamingTakeProfitLevel: (naming_take_profit_level: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        naming_take_profit_level 
                    },
                })),
            setNamingStoplossLevel: (naming_stoploss_level: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        naming_stoploss_level 
                    },
                })),
            setShowRrTp: (show_rr_tp: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        show_rr_tp 
                    },
                })),
            setShowPipsTp: (show_pips_tp: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        show_pips_tp 
                    },
                })),
            setShowPipsSl: (show_pips_sl: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        show_pips_sl 
                    },
                })),
            setShowChart: (show_chart: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        show_chart 
                    },
                })),
            setChartAutoUpdate: (chart_auto_update: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        chart_auto_update 
                    },
                })),
            setChartBlurFreeSignals: (chart_blur_free_signals: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        chart_blur_free_signals 
                    },
                })),
            setChartBullCandleColor: (chart_bull_candle_color: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        chart_bull_candle_color 
                    },
                })),
            setChartBearCandleColor: (chart_bear_candle_color: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        chart_bear_candle_color 
                    },
                })),
            setPingSignal: (ping_signal: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        ping_signal 
                    },
                })),
            setPingTradeUpdate: (ping_trade_update: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        ping_trade_update 
                    },
                })),
            setPingRoleIdSignal: (ping_role_id_signal: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        ping_role_id_signal 
                    },
                })),
            setPendingTradesAutoUpdate: (pending_trades_auto_update: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        pending_trades_auto_update 
                    },
                })),
            setPendingTrades: (pending_trades: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        pending_trades 
                    },
                })),
            setChannelIdPendingTrades: (channel_id_pending_trades: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_pending_trades 
                    },
                })),
            setChannelIdPatchNotes: (channel_id_patch_notes: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_patch_notes 
                    },
                })),
            setChannelIdChatbot: (channel_id_chatbot: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_chatbot 
                    },
                })),
            setChannelIdFreeSignals: (channel_id_free_signals: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_free_signals 
                    },
                })),
            setChannelIdSignals: (channel_id_signals: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_signals 
                    },
                })),
            setChannelIdPreApprove: (channel_id_pre_approve: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_pre_approve 
                    },
                })),
            setChannelIdResults: (channel_id_results: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        channel_id_results 
                    },
                })),
            setGuildIdDev: (guild_id_dev: number) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        guild_id_dev 
                    },
                })),
            setGuildId: (guild_id: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        guild_id 
                    },
                })),
            setSafeMode: (safe_mode: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        safe_mode 
                    },
                })),
            setSignalAutoApprove: (signal_auto_approve: boolean) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        signal_auto_approve 
                    },
                })),
            setBotId: (bot_id: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        bot_id 
                    },
                })),
            setPendingLastUpdate: (pending_last_update: string) =>
                set((state) => ({
                    algorithm: { 
                        ...state.algorithm, 
                        pending_last_update 
                    },
                })),
        }),
        {
            name: 'algorithm-storage',
            storage: createJSONStorage(() => localStorage), // storage method
        }
    )
);
