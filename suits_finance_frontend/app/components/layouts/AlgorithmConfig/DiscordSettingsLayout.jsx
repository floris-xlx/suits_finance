import React, { Fragment, useEffect } from 'react';
import SwitchInBlock from '@/app/components/ui/Switches/SwitchInBlock';

import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import InputField from '@/app/components/ui/InputFields/InputField';
import InputFieldDataWrapper from '@/app/components/dataWrappers/inputFieldWrapper';
import ToggleBlockDataWrapper from '@/app/components/ui/Switches/ToggleBlockDataWrapper';


// zustand
import { useUserViewStore, useAlgorithmStore, useUserStore, useLoadingStore, useAlgorithmConfigLayoutStore } from '@/app/stores/stores';

const DiscordSettingsLayout = ({
    show = false,
    algorithmId,
    guild_id,
    organization,

}) => {
    // zustand
    const { algorithm, setChannelIdPatchNotes, setChannelIdPendingTrades } = useAlgorithmStore();
    

    return (
        <Fragment>
            {show && (
                <div className="flex flex-col md:flex-row gap-x-4 w-full h-full text-primary md:pb-0 pb-[250px]">

                    <div className="flex flex-col gap-y-2">


                        <div className="flex flex-col gap-x-2 lg:flex-row lg:mx-0 mx-auto items-center">
                            < ToggleBlockDataWrapper
                                label="Pending Trades"
                                subText='Enable a pending trades message to be sent to the discord channel.'
                                cacheKey='cachedPendingTradesAlgoSettings'
                                algorithmId={algorithmId}
                                supabaseKey={'pending_trades'}
                                organization={organization}
                            />

                            < ToggleBlockDataWrapper
                                label="Pending Trades Auto Update"
                                subText='Toggle whether the pending trades message should auto updates.'
                                cacheKey='cachedPendingTradesAlgoAutoUpdate'
                                algorithmId={algorithmId}
                                supabaseKey={'pending_trades_auto_update'}
                                organization={organization}
                            />

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
                            <InputFieldDataWrapper
                                label='Channel ID Pending Trades'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_pending_trades'
                            />

                            <InputFieldDataWrapper
                                label='Channel ID Patch Notes'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_patch_notes'
                            />
                            <InputFieldDataWrapper
                                label='Channel ID Chatbot'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_chatbot'
                            />

                            <InputFieldDataWrapper
                                label='Channel ID Free Signals'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_free_signals'
                            />
                            <InputFieldDataWrapper
                                label='Channel ID Signals'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_signals'
                            />
                            <InputFieldDataWrapper
                                label='Channel ID Pre Approve'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_signals'
                            />


                            <InputFieldDataWrapper
                                label='Channel ID Results'
                                algorithm_id={algorithmId}
                                organization={organization}
                                supabaseKey='channel_id_results'
                            />

                            <InputField
                                label='Guild ID'
                                value={guild_id}
                                type='number'
                                disabled={true}
                                width={220}
                                padding={0}
                                tooltip={true}
                                tooltipContent='For security reasons, Guild IDs are not editable. If you need to change the Guild ID, please contact support.'
                                marginTop={4}
                            />

                        </div>

                    </div>


                </div>
            )}
        </Fragment>
    );
}

export default DiscordSettingsLayout;