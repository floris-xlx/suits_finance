import React, { useState, useEffect, Fragment } from 'react';

const HeaderItem = ({
    targetHref = '/journal',
    currentHref = '/',
    label,
    hide = false
}) => {
    if (hide) {
        return null;
    }

    // this controls the highlight IF we are on a specific page route
    const highlightHeaderItem = "bg-brand-accent text-primary cursor-default"
    const defaultHeaderItemClass = " select-none  rounded-md px-2 py-1 text-primary text-[15px] font-[500] ml-2 flex items-center"

    return (
        <a
            href={targetHref}
            className={`${defaultHeaderItemClass} ${currentHref === targetHref ? highlightHeaderItem : 'hover:bg-accent hover:transition cursor-pointer'}`}>
            {label}
        </a>
    );

}

export default HeaderItem;
