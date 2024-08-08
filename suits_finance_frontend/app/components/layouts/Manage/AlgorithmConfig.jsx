import React, { useState, useEffect, Fragment, use } from 'react';

// zustand
import { useUserViewStore, useAlgorithmStore, useUserStore, useLoadingStore, useAlgorithmConfigLayoutStore } from '@/app/stores/stores';
import { GetKeyLocalStorage, SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';

// data fetching
import { GetAlgorithmSettingsByOrganization, IsUserIdGlobalAdmin } from '@/app/client/supabase/SupabaseOrgData';

// ui
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import AlgorithmNameCard from '@/app/components/ui/Cards/AlgorithmNameCard';
import SettingsCard from '@/app/components/ui/Cards/SettingsCard';
import { Cog6ToothIcon, ChartBarSquareIcon, PaintBrushIcon, CodeBracketIcon, InformationCircleIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { DiscordIcon } from '@/app/components/ui/Icon';
import SettingsCardLabel from '@/app/components/ui/Labels/SettingsCardLabel';

// github
import { getLatestCommitHash } from '@/app/client/api/GithubLatestCommit';
import { SkeletonLoader } from '../../ui/XylexUI';

// layouts for the settings
import AdminSettingsLayout from '../AlgorithmConfig/AdminSettingsLayout';
import AlgorithmSettingsLayout from '../AlgorithmConfig/AlgorithmSettingsLayout';
import ChartSettingsLayout from '../AlgorithmConfig/ChartSettingsLayout';
import BrandingSettingsLayout from '../AlgorithmConfig/BrandingSettingsLayout';
import DiscordSettingsLayout from '../AlgorithmConfig/DiscordSettingsLayout';
import MetaDataLayout from '../AlgorithmConfig/MetaDataLayout';


const AlgorithmConfigLayout = () => {
    // zustand
    const {
        algorithm,
        setName,
        setOrganization, // admin only
        setAlgorithmId, // admin only
        setProfilePicture,
        setAuthor,
        setFooter, // admin only
        setChannelIdDev, // admin only
        setPromoteUrl,
        setNamingAiSummary,
        setNamingEntryLevel,
        setNamingTakeProfitLevel,
        setNamingStoplossLevel,
        setShowRrTp,
        setShowPipsTp,
        setShowPipsSl,
        setShowChart,
        setChartAutoUpdate,
        setChartBlurFreeSignals,
        setChartBullCandleColor,
        setChartBearCandleColor,
        setPingSignal,
        setPingTradeUpdate,
        setPingRoleIdSignal,
        setPendingTradesAutoUpdate,
        setPendingTrades,
        setChannelIdPendingTrades,
        setChannelIdPatchNotes,
        setChannelIdChatbot,
        setChannelIdFreeSignals,
        setChannelIdSignals,
        setChannelIdPreApprove,
        setChannelIdResults,
        setGuildIdDev, // admin only
        setGuildId, // admin only
        setSafeMode, // admin only
        setSignalAutoApprove,
        setBotId, // admin only
        setPendingLastUpdate  // admin only // system cache
    } = useAlgorithmStore();
    const { view } = useUserViewStore();
    const { user } = useUserStore();
    const { loading, setAuthLoading } = useLoadingStore();
    const {
        algorithm_config_layout,
        setLayoutToAdminSettings,
        setLayoutToAlgorithmSettings,
        setLayoutToBrandingSettings,
        setLayoutToChartSettings,
        setLayoutToDiscordSettings,
        setLayoutToMetadata
    } = useAlgorithmConfigLayoutStore();


    // get the algorithm id from the local storage
    const algorithm_id = GetKeyLocalStorage('cachedAlgorithmId');


    // local states
    const [algorithmSettings, setAlgorithmSettings] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [commit_hash, setCommitHash] = useState(null);

    // set the admin state



    // check if user is global admin
    useEffect(() => {
        // set the auth loading to true
        setAuthLoading(true);

        const fetchData = async () => {
            const userId = user.id
            await IsUserIdGlobalAdmin(userId).then((data) => {
                setIsAdmin(data);

                // set the auth loading to false
                setAuthLoading(false);
            });
        };

        fetchData();
    }, [user.id]);

    // data fetching
    useEffect(() => {


        const fetchData = async () => {
            const algorithmSettings = await GetAlgorithmSettingsByOrganization(
                user.organization,
                algorithm_id
            );

            if (algorithmSettings) {
                setAlgorithmSettings(algorithmSettings[0]);
            }
        }
        fetchData();
    }, [user.organization, algorithm_id]);


    // get the latest commit hash
    useEffect(() => {
        const fetchData = async () => {
            const commit_hash = await getLatestCommitHash();
            setCommitHash(commit_hash);
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (algorithmSettings) {
            setName(algorithmSettings.name);
            setOrganization(algorithmSettings.organization);
            setAlgorithmId(algorithmSettings.algorithm_id);
            setProfilePicture(algorithmSettings.profile_pic_url);
            setAuthor(algorithmSettings.author);
            setFooter(algorithmSettings.footer);
            setChannelIdDev(algorithmSettings.channel_id_dev);
            setPromoteUrl(algorithmSettings.promote_url);
            setNamingAiSummary(algorithmSettings.naming_ai_summery); // ik is a typo but supabase got this key
            setNamingEntryLevel(algorithmSettings.naming_entry_level);
            setNamingTakeProfitLevel(algorithmSettings.naming_take_profit_level);
            setNamingStoplossLevel(algorithmSettings.naming_stoploss_level);
            setShowRrTp(algorithmSettings.show_rr_tp);
            setShowPipsTp(algorithmSettings.show_pips_tp);
            setShowPipsSl(algorithmSettings.show_pips_stoploss);
            setShowChart(algorithmSettings.show_chart);
            setChartAutoUpdate(algorithmSettings.chart_auto_update);
            setChartBlurFreeSignals(algorithmSettings.chart_blur_free_signal);
            setChartBullCandleColor(algorithmSettings.chart_bull_candle_color);
            setChartBearCandleColor(algorithmSettings.chart_bear_candle_color);
            setPingSignal(algorithmSettings.ping_signal);
            setPingTradeUpdate(algorithmSettings.ping_trade_update);
            setPingRoleIdSignal(algorithmSettings.ping_role_id_signal);
            setPendingTradesAutoUpdate(algorithmSettings.pending_trades_auto_update);
            setPendingTrades(algorithmSettings.pending_trades);
            setChannelIdPendingTrades(algorithmSettings.channel_id_pending_trades);
            setChannelIdPatchNotes(algorithmSettings.channel_id_patch_notes);
            setChannelIdChatbot(algorithmSettings.channel_id_chatbot);
            setChannelIdFreeSignals(algorithmSettings.channel_id_free_signals);
            setChannelIdSignals(algorithmSettings.channel_id_signals);
            setChannelIdPreApprove(algorithmSettings.channel_id_pre_approve);
            setChannelIdResults(algorithmSettings.channel_id_results);
            setGuildIdDev(algorithmSettings.guild_id_dev);
            setGuildId(algorithmSettings.guild_id);
            setSafeMode(algorithmSettings.safe_mode);
            setSignalAutoApprove(algorithmSettings.signal_auto_approve);
            setBotId(algorithmSettings.bot_id);
            setPendingLastUpdate(algorithmSettings.pending_last_update);
        }
    }, [algorithmSettings]);

    if (loading.authLoading) {
        return <Fragment>
            <LoaderScreen />
        </Fragment>;
    }



    return (
        <Fragment>
            <div className="flex flex-col md:flex-row">
                <div className="text-primary gap-y-3 flex flex-col w-full md:min-w-[320px] md:max-w-[320px]  ">

                    <div className="px-1 pb-2">

                        < AlgorithmNameCard
                            algorithmName={algorithm.name}
                            profilePicUrl={algorithm.profile_picture}
                            organization={algorithm.organization}
                        />
                    </div>

                    < SettingsCard>
                        < SettingsCardLabel
                            onPress={setLayoutToAdminSettings}
                            label={'Admin Settings'}
                            admin={!isAdmin}
                            color={'bg-yellow-300'}
                            highlight={algorithm_config_layout.isAdminSettings}

                        >
                            < CodeBracketIcon className="w-6 h-6 text-white" />
                        </SettingsCardLabel>
                        < SettingsCardLabel
                            onPress={setLayoutToAlgorithmSettings}
                            label={'Algorithm Settings'}
                            highlight={algorithm_config_layout.isAlgorithmSettings}
                        >
                            < Cog6ToothIcon className="w-6 h-6 text-white" />
                        </SettingsCardLabel>
                        < SettingsCardLabel
                            onPress={setLayoutToChartSettings}
                            label={'Chart Settings'}
                            color={'bg-purple-500'}
                            highlight={algorithm_config_layout.isChartSettings}
                        >
                            < ChartBarSquareIcon className="w-6 h-6 text-white" />
                        </SettingsCardLabel>
                        < SettingsCardLabel
                            onPress={setLayoutToBrandingSettings}
                            label={'Branding Settings'}
                            color={'bg-indigo-400'}
                            highlight={algorithm_config_layout.isBrandingSettings}
                        >
                            <PaintBrushIcon className="w-6 h-6 text-white" />
                        </SettingsCardLabel>
                        < SettingsCardLabel
                            onPress={setLayoutToDiscordSettings}
                            label={'Discord Settings'}
                            color={'bg-blue-500'}
                            highlight={algorithm_config_layout.isDiscordSettings}
                        >
                            < DiscordIcon colorWhite={true} className="w-6 h-6 text-white" />
                        </SettingsCardLabel>
                        < SettingsCardLabel
                            onPress={setLayoutToMetadata}
                            label={'Metadata'}
                            color={'bg-gray-400'}
                            lastItem={true}
                            highlight={algorithm_config_layout.isMetadata}
                        >
                            < InformationCircleIcon className="w-6 h-6 text-white" />
                        </SettingsCardLabel>

                    </SettingsCard>



                    <div className="flex flex-row items-center text-accent opacity-60 select-none mx-auto">
                        {commit_hash ? (
                            <p className="flex flex-row items-center text-accent opacity-60 select-none w-fit">
                                build ID: {commit_hash}
                            </p>
                        ) : (
                            <div className="flex w-[125px] h-[25px]">
                                <SkeletonLoader width={'full'} height={'full'} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:ml-[30px] mt-[70px] h-fit w-full md:min-w-[400px]">


                    < AdminSettingsLayout
                        show={algorithm_config_layout.isAdminSettings}
                        bot_id={algorithm.bot_id}
                        algorithmId={algorithm.algorithm_id}
                        pending_last_update={algorithm.pending_last_update}
                        guild_id={algorithm.guild_id}
                        guild_id_dev={algorithm.guild_id_dev}
                    />
                    < ChartSettingsLayout show={algorithm_config_layout.isChartSettings} />
                    < BrandingSettingsLayout
                        show={algorithm_config_layout.isBrandingSettings}
                    />
                    < DiscordSettingsLayout
                        show={algorithm_config_layout.isDiscordSettings}
                        algorithmId={algorithm.algorithm_id}
                        guild_id={algorithm.guild_id}
                        organization={algorithm.organization}

                    />
                    < MetaDataLayout show={algorithm_config_layout.isMetadata}
                        algorithmId={algorithm.algorithm_id}
                        bot_id={algorithm.bot_id}
                        guild_id={algorithm.guild_id}
                        pending_last_update={algorithm.pending_last_update}

                    />
                    < AlgorithmSettingsLayout show={algorithm_config_layout.isAlgorithmSettings} />
                </div>

            </div>
        </Fragment>
    )
}

export default AlgorithmConfigLayout;