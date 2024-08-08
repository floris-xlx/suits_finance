import React, { Fragment } from 'react';
import { Spinner, Tooltip } from '@nextui-org/react'

import { useLoadingStore } from "@/app/stores/stores";

const SyncingCard = () => {
    const { loading } = useLoadingStore();

    return (
        <Fragment>
            {loading.syncing && (
                <Tooltip
                    className="border border-primary"
                    content={
                        <div className="px-1 py-2 ">
                            <div className="text-small font-bold text-primary">Syncing your changes</div>
                            <div className="text-tiny text-secondary">Your {loading.itemsLeft === 1 || loading.itemsLeft === undefined ? 'change is being saved' : `${loading.itemsLeft || 1} changes are being saved`}.</div>
                        </div>
                    }
                >
                    <div className="bg-primary h-fit w-fit ml-[25px] rounded-full flex items-center p-[6px] hover:bg-accent transition">
                        <Spinner size="sm" color="warning" />
                        <p className="text-secondary text-xs ml-2 font-semibold text-nowrap select-none">{`Syncing ${loading.itemsLeft || 1}`}</p>
                    </div>
                </Tooltip>
            )}
        </Fragment>
    )
}

export default SyncingCard;