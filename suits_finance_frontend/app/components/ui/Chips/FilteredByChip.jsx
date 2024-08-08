import React, { useState, useEffect, Fragment } from 'react';

import { TagIcon } from '@heroicons/react/24/outline';

const FilteredByChip = ({ filter, setFilter }) => {
    const filterName = "Trade Status";
    const operator = "is";

    return (
        <Fragment>
            <div className=" h-[30px] w-fit rounded-md flex items-center px-2">
                
                <div className="flex flex-row gap-x-1 items-center border border-primary px-2 py-1 rounded-l-md h-[30px] bg-secondary">
                    < TagIcon className="h-5 w-5 text-primary" />
                    <span className="text-primary text-xs">{filterName}</span>
                </div>
                <div className="flex flex-row gap-x-1 items-center border border-l-0 border-primary px-2 py-1 rounded-r-md h-[30px] bg-secondary">
                    <span className="text-primary text-xs">{operator}</span>
                </div>
                
            </div>
        </Fragment>
    )
}

export default FilteredByChip;