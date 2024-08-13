import React, { useState, useEffect, Fragment } from 'react';
import { fetchUserRoles } from '@/app/client/supabase/SupabaseUserData.js';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";





const MemberTrade = ({
    roleOptions = []
}) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetchUserRoles().then((data) => {
            setUsers(data);

            console.log(data);
        });
    }, []);

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["All user roles"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <div
            className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none border border-default-200 bg-transparent"
            tabindex="-1"
        >
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <div className="flex flex-col relative gap-4 w-full">
                    <div>
                        <div className="flex items-center justify-between gap-3">
                            <div
                                className="group flex flex-col data-[hidden=true]:hidden group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] w-full"
                                data-slot="base"
                                data-filled="true"
                                data-filled-within="true"
                            >
                                <div data-slot="main-wrapper" className="h-full flex flex-col">
                                    <div
                                        data-slot="input-wrapper"
                                        className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background"
                                        style={{ cursor: 'text' }}
                                    >
                                        <div
                                            data-slot="inner-wrapper"
                                            className="inline-flex w-full items-center h-full box-border"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                focusable="false"
                                                height="1em"
                                                role="presentation"
                                                viewBox="0 0 24 24"
                                                width="1em"
                                            >
                                                <path
                                                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                ></path>
                                                <path
                                                    d="M22 22L20 20"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                ></path>
                                            </svg>
                                            <input
                                                data-slot="input"
                                                data-has-start-content="true"
                                                className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small peer pr-6 rtl:pr-0 rtl:pl-6 group-data-[has-value=true]:text-default-foreground h-full"
                                                aria-label="Search by name..."
                                                placeholder="Search by name..."
                                                id="react-aria5550266582-:r96:"
                                                type="text"
                                                value=""
                                            ></input>
                                            <span
                                                role="button"
                                                tabindex="0"
                                                data-slot="clear-button"
                                                className="p-2 -m-2 z-10 hidden absolute right-3 rtl:right-auto rtl:left-3 appearance-none select-none opacity-0 hover:!opacity-100 cursor-pointer active:!opacity-70 rounded-full outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-large peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block transition-opacity motion-reduce:transition-none"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    height="1em"
                                                    role="presentation"
                                                    viewBox="0 0 24 24"
                                                    width="1em"
                                                >
                                                    <path
                                                        d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize"
                                        >
                                            {selectedValue}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="select user access role"
                                        variant="flat"
                                        closeOnSelect={false}
                                        disallowEmptySelection
                                        selectionMode="multiple"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        
                                        <DropdownItem key="user">User</DropdownItem>
                                        <DropdownItem key="admin">Admin</DropdownItem>
                                        <DropdownItem key="super_admin">Super Admin</DropdownItem>
                                        <DropdownItem key="developer">Developer</DropdownItem>

                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div data-slot="base" className="inline-flex mt-3" aria-label="roles">
                            <div
                                data-slot="tabList"
                                className="flex p-1 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent rounded-none"
                                id="react-aria5550266582-:r9e:"
                                aria-label="roles"
                                role="tablist"
                                aria-orientation="horizontal"
                            >
                                <button
                                    data-slot="tab"
                                    tabindex="0"
                                    data-key="members"
                                    id="react-aria5550266582-:r9e:-tab-members"
                                    aria-selected="true"
                                    role="tab"
                                    className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-none"
                                    type="button"
                                    data-selected="true"
                                >
                                    <span
                                        className="absolute z-0 h-[2px] w-[80%] bottom-0 shadow-[0_1px_0px_0_rgba(0,0,0,0.05)] bg-foreground rounded-none"
                                        data-slot="cursor"
                                        style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
                                    ></span>
                                    <div
                                        className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-foreground"
                                        data-slot="tabContent"
                                    >
                                        Members
                                    </div>
                                </button>
                                <button
                                    data-slot="tab"
                                    tabindex="-1"
                                    data-key="pending-invitations"
                                    id="react-aria5550266582-:r9e:-tab-pending-invitations"
                                    aria-selected="false"
                                    role="tab"
                                    className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-none"
                                    type="button"
                                >
                                    <div
                                        className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-foreground"
                                        data-slot="tabContent"
                                    >
                                        Pending Invitations
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="z-0 flex flex-col relative justify-between gap-4 overflow-auto rounded-large w-full max-h-[382px] bg-transparent p-0 border-none shadow-none">
                        <table
                            aria-label="Team Manage Table"
                            id="react-aria5550266582-:r94:"
                            role="grid"
                            aria-multiselectable="true"
                            tabindex="0"
                            aria-describedby=""
                            className="min-w-full h-auto table-auto w-full"
                        >
                            <thead
                                className="[&amp;>tr]:first:rounded-lg hidden sticky top-0 z-20 [&amp;>tr]:first:shadow-small"
                                role="rowgroup"
                            >
                                <tr
                                    role="row"
                                    className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-default"
                                >
                                    <th
                                        tabindex="-1"
                                        data-key="row-header-column-a3fqr1erla"
                                        role="columnheader"
                                        id="react-aria5550266582-:r94:-row-header-column-a3fqr1erla"
                                        className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
                                    >
                                        <label
                                            className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
                                            aria-label="Select All"
                                        >
                                            <span style={{
                                                border: '0px',
                                                clip: 'rect(0px, 0px, 0px, 0px)',
                                                clipPath: 'inset(50%)',
                                                height: '1px',
                                                margin: '-1px',
                                                overflow: 'hidden',
                                                padding: '0px',
                                                position: 'absolute',
                                                width: '1px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <input
                                                    aria-label="Select All"
                                                    aria-labelledby=":r9j:"
                                                    type="checkbox"
                                                    value=""
                                                ></input>
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset] rounded-[calc(theme(borderRadius.medium)*0.6)] before:rounded-[calc(theme(borderRadius.medium)*0.6)] after:rounded-[calc(theme(borderRadius.medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none after:bg-foreground after:text-background text-background"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    viewBox="0 0 17 18"
                                                    className="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none"
                                                >
                                                    <polyline
                                                        fill="none"
                                                        points="1 9 7 14 15 4"
                                                        stroke="currentColor"
                                                        stroke-dasharray="22"
                                                        stroke-dashoffset="66"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    ></polyline>
                                                </svg>
                                            </span>
                                        </label>
                                    </th>
                                    <th
                                        data-sortable="true"
                                        tabindex="-1"
                                        data-key="name"
                                        role="columnheader"
                                        id="react-aria5550266582-:r94:-name"
                                        aria-sort="none"
                                        className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
                                        aria-describedby="react-aria-description-2"
                                    >
                                        NAME
                                        <svg
                                            aria-hidden="true"
                                            fill="none"
                                            focusable="false"
                                            height="1em"
                                            role="presentation"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                            width="1em"
                                            className="ml-2 mb-px opacity-0 text-inherit inline-block transition-transform-opacity data-[visible=true]:opacity-100 group-data-[hover=true]:opacity-100 data-[direction=ascending]:rotate-180"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </th>
                                    <th
                                        data-sortable="true"
                                        tabindex="-1"
                                        data-key="role"
                                        role="columnheader"
                                        id="react-aria5550266582-:r94:-role"
                                        aria-sort="none"
                                        className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
                                        aria-describedby="react-aria-description-2"
                                    >
                                        ROLE
                                        <svg
                                            aria-hidden="true"
                                            fill="none"
                                            focusable="false"
                                            height="1em"
                                            role="presentation"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                            width="1em"
                                            className="ml-2 mb-px opacity-0 text-inherit inline-block transition-transform-opacity data-[visible=true]:opacity-100 group-data-[hover=true]:opacity-100 data-[direction=ascending]:rotate-180"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </th>
                                    <th
                                        data-sortable="true"
                                        tabindex="-1"
                                        data-key="status"
                                        role="columnheader"
                                        id="react-aria5550266582-:r94:-status"
                                        aria-sort="none"
                                        className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
                                        aria-describedby="react-aria-description-2"
                                    >
                                        STATUS
                                        <svg
                                            aria-hidden="true"
                                            fill="none"
                                            focusable="false"
                                            height="1em"
                                            role="presentation"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                            width="1em"
                                            className="ml-2 mb-px opacity-0 text-inherit inline-block transition-transform-opacity data-[visible=true]:opacity-100 group-data-[hover=true]:opacity-100 data-[direction=ascending]:rotate-180"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </th>
                                    <th
                                        tabindex="-1"
                                        data-key="actions"
                                        role="columnheader"
                                        id="react-aria5550266582-:r94:-actions"
                                        className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-center"
                                    >
                                        ACTIONS
                                    </th>
                                </tr>
                                <tr
                                    tabindex="-1"
                                    aria-hidden="true"
                                    className="w-px h-px block"
                                    style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
                                ></tr>
                            </thead>
                            <tbody role="rowgroup">
                                <tr
                                    data-first="true"
                                    role="row"
                                    aria-selected="false"
                                    tabindex="-1"
                                    data-key="1"
                                    aria-labelledby="react-aria5550266582-:r94:-1-name"
                                    className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-default"
                                >
                                    <td
                                        tabindex="-1"
                                        data-key="1header"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <label
                                            className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
                                            id="react-aria5550266582-:ran:"
                                            aria-label="Select"
                                            aria-labelledby="react-aria5550266582-:ran: react-aria5550266582-:r94:-1-name"
                                        >
                                            <span style={{
                                                border: '0px',
                                                clip: 'rect(0px, 0px, 0px, 0px)',
                                                clipPath: 'inset(50%)',
                                                height: '1px',
                                                margin: '-1px',
                                                overflow: 'hidden',
                                                padding: '0px',
                                                position: 'absolute',
                                                width: '1px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <input
                                                    aria-label="Select"
                                                    aria-labelledby="react-aria5550266582-:ran: react-aria5550266582-:r94:-1-name"
                                                    type="checkbox"
                                                    value=""
                                                ></input>
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset] rounded-[calc(theme(borderRadius.medium)*0.6)] before:rounded-[calc(theme(borderRadius.medium)*0.6)] after:rounded-[calc(theme(borderRadius.medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none after:bg-foreground after:text-background text-background"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    viewBox="0 0 17 18"
                                                    className="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none"
                                                >
                                                    <polyline
                                                        fill="none"
                                                        points="1 9 7 14 15 4"
                                                        stroke="currentColor"
                                                        stroke-dasharray="22"
                                                        stroke-dashoffset="66"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    ></polyline>
                                                </svg>
                                            </span>
                                        </label>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="11name"
                                        role="rowheader"
                                        id="react-aria5550266582-:r94:-1-name"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div
                                            tabindex="-1"
                                            className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                                        >
                                            <span
                                                tabindex="-1"
                                                className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large"
                                            >
                                                <img
                                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                                    className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                                    alt="Tony Reichert"
                                                    data-loaded="true"
                                                ></img>
                                            </span>
                                            <div className="inline-flex flex-col items-start">
                                                <span className="text-small text-inherit">
                                                    Tony Reichert
                                                </span>
                                                <span className="text-tiny text-foreground-400">
                                                    tony.reichert@acme.com
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="11role"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div className="flex flex-col">
                                            <p className="text-bold  text-small capitalize text-default-500">
                                                Owner
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="11status"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-full bg-success/20 text-success-600 dark:text-success capitalize">
                                            <span className="flex-1 text-inherit font-normal px-1">
                                                active
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="11actions"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-center"
                                    >
                                        <div className="relative flex items-center justify-end gap-2">
                                            <button
                                                className="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny  rounded-small px-0 !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-8 w-8 h-8 z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased"
                                                type="button"
                                                data-slot="trigger"
                                                id="react-aria5550266582-:rap:"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"

                                                    aria-hidden="true"
                                                    role="img"
                                                    className="h-6 w-6 text-default-500 iconify iconify--solar"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr
                                    data-last="true"
                                    role="row"
                                    aria-selected="false"
                                    tabindex="-1"
                                    data-key="2"
                                    aria-labelledby="react-aria5550266582-:r94:-2-name"
                                    className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-default"
                                    data-odd="true"
                                >
                                    <td
                                        tabindex="-1"
                                        data-key="2header"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <label
                                            className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
                                            id="react-aria5550266582-:r9p:"
                                            aria-label="Select"
                                            aria-labelledby="react-aria5550266582-:r9p: react-aria5550266582-:r94:-2-name"
                                        >
                                            <span style={{
                                                border: '0px',
                                                clip: 'rect(0px, 0px, 0px, 0px)',
                                                clipPath: 'inset(50%)',
                                                height: '1px',
                                                margin: '-1px',
                                                overflow: 'hidden',
                                                padding: '0px',
                                                position: 'absolute',
                                                width: '1px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <input
                                                    aria-label="Select"
                                                    aria-labelledby="react-aria5550266582-:r9p: react-aria5550266582-:r94:-2-name"
                                                    type="checkbox"
                                                    value=""
                                                ></input>
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset] rounded-[calc(theme(borderRadius.medium)*0.6)] before:rounded-[calc(theme(borderRadius.medium)*0.6)] after:rounded-[calc(theme(borderRadius.medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none after:bg-foreground after:text-background text-background"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    viewBox="0 0 17 18"
                                                    className="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none"
                                                >
                                                    <polyline
                                                        fill="none"
                                                        points="1 9 7 14 15 4"
                                                        stroke="currentColor"
                                                        stroke-dasharray="22"
                                                        stroke-dashoffset="66"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    ></polyline>
                                                </svg>
                                            </span>
                                        </label>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="22name"
                                        role="rowheader"
                                        id="react-aria5550266582-:r94:-2-name"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div
                                            tabindex="-1"
                                            className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                                        >
                                            <span
                                                tabindex="-1"
                                                className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large"
                                            >
                                                <img
                                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                                    className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                                    alt="Zoey Lang"
                                                    data-loaded="true"
                                                ></img>
                                            </span>
                                            <div className="inline-flex flex-col items-start">
                                                <span className="text-small text-inherit">Zoey Lang</span>
                                                <span className="text-tiny text-foreground-400">
                                                    zoey.lang@acme.com
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="22role"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div className="flex flex-col">
                                            <p className="text-bold  text-small capitalize text-default-500">
                                                Member
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="22status"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start"
                                    >
                                        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-full bg-danger/20 text-danger dark:text-danger-500 capitalize">
                                            <span className="flex-1 text-inherit font-normal px-1">
                                                pending
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="22actions"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-center"
                                    >
                                        <div className="relative flex items-center justify-end gap-2">
                                            <button
                                                className="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny  rounded-small px-0 !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-8 w-8 h-8 z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased"
                                                type="button"
                                                data-slot="trigger"
                                                id="react-aria5550266582-:r9r:"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"

                                                    aria-hidden="true"
                                                    role="img"
                                                    className="h-6 w-6 text-default-500 iconify iconify--solar"
                                                    width="1em"
                                                    height="1em"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberTrade;
