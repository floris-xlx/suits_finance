import React, { Fragment } from 'react';

const ArchiveTrade = ({
    trade_hash
}) => {
    return (
        <Fragment>
            <p>Are you sure you want to archive this trade?</p>

            <p>
                Archiving is irreversible and will remove this trade from the
                list of pending trades. The trade can still be accessed but will not show up in the search.
            </p>

            <p className="rounded-md bg-input-primary text-accent p-1 text-center text-[14px] cursor-default mt-2 select-none">
                {trade_hash}
            </p>
        </Fragment>
    )
}

export default ArchiveTrade;