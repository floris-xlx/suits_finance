import React, { Fragment, useEffect } from 'react';
import SwitchInBlock from '@/app/components/ui/Switches/SwitchInBlock';

import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import InputField from '@/app/components/ui/InputFields/InputField';

const MetaDataLayout = ({ show = false, algorithmId, bot_id, pending_last_update, guild_id }) => {
    return (
        <Fragment>
            {show && (
                <div className="flex flex-col sm:flex-row gap-x-4 w-full h-full text-primary sm:pb-0 pb-[250px]">

                    <div className="flex flex-col gap-y-2">


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
                            <InputField
                                label='Bot ID'
                                value={bot_id}
                                type='number'
                                disabled={true}
                                width={220}
                            />

                            <InputField
                                label='Pending last update'
                                value={pending_last_update}
                                type='number'
                                disabled={true}
                                width={220}
                            />

                            <InputField
                                label='Guild ID'
                                value={guild_id}
                                type='number'
                                disabled={true}
                                width={220}
                            />

                            <InputField
                                label='Algorithm ID'
                                type={'text'}
                                value={algorithmId}
                                disabled={true}
                                width={220}

                            />
                        </div>



                    </div>


                </div>
            )}
        </Fragment>
    );
}

export default MetaDataLayout;