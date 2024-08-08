import React, { Fragment } from 'react';

const InvalidateTrade = ({
    trade_hash
}) => {
    return (
        <Fragment>
            <p>Are you sure you want to invalidate this trade?</p>

            <p>
                Invalidation is irreversible and will remove this trade from the
                list of pending trades, accompanied by a notification to the channel
                members.
            </p>

            <p className="text-yellow-500 bg-red-accent rounded-md p-3 border-yellow-400 border-2 font-bold">
                Trade messages for invalidation are not yet implemented !!!
                <br></br>It WILL update the status however!!
            </p>

            <p className="rounded-md bg-input-primary text-accent p-1 text-center text-[14px] cursor-default mt-2 select-none">
                {trade_hash}
            </p>
        </Fragment>
    )
}

export default InvalidateTrade;