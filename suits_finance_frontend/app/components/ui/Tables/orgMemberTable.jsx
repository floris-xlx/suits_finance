import React, { useState, useEffect, Fragment } from 'react';
import { fetchUserRoles } from '@/app/client/supabase/SupabaseUserData.js';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import InputFieldDataWrapperUser from '@/app/components/dataWrappers/inputFieldWrapperUser';
import InputField from '@/app/components/ui/InputFields/InputField';
import TabHorizontal from '@/app/components/ui/Tabs/TabHorizontalWithValue';
import CapitalizeFirstLetter from '@/app/client/hooks/formatting/CapitalizeLetter';



const MemberTrade = ({
    roleOptions = []
}) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState("members");

    const memberStates = [
        "Members",
        "Pending",
    ]

    const dropdownItems = [
        {
            key: "new",
            label: "View profile",
        },
        {
            key: "copy",
            label: "Edit user",
        },
        {
            key: "edit",
            label: "Flag user",
        },
        {
            key: "delete",
            label: "Freeze user",
        }
    ];



    console.log(users);

    const StatusColors = {
        active: "bg-green-accent text-green border border-green-500/30",
        inactive: "bg-yellow-accent text-yellow border border-yellow-500/30",
        pending: "bg-blue-primary text-blue border border-blue-500/30",
    };

    const renderChip = (tradeStatus) => {
        const Text = StatusColors[tradeStatus] ? CapitalizeFirstLetter(tradeStatus) : "???";
        const chipColor = StatusColors[tradeStatus] ? StatusColors[tradeStatus] : "bg-input-primary text-gray-400";

        return (
            <div className={`flex gap-4 rounded-md py-[3px] px-[7px] w-fit ${chipColor} `}>
                <div className=" text-[12px] font-normal flex flex-row  gap-1 select-none mx-auto pl-[1px]">
                    {Text}
                </div>
            </div>
        );
    };


    useEffect(() => {
        fetchUserRoles().then((data) => {
            setUsers(data);

        });
    }, []);


    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["All user roles"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <div
            className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none border border-default-200 bg-secondary"
            tabindex="-1"
        >
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <div className="flex flex-col relative gap-4 w-full">
                    <div>
                        <div className="flex items-center justify-between gap-3 pl-1">
                            <InputField
                                value={searchQuery}
                                setValue={setSearchQuery}
                                type='text'
                                width='full'
                            />
                            <div className="flex gap-3 -mt-[-7px]">
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
                        <div data-slot="base" className="inline-flex mt-3 ml-1" aria-label="roles">
                            < TabHorizontal
                                options={memberStates}
                                setValueExternal={setSelectedTab}
                                variant="underlined"
                            />
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
                                            <Checkbox radius="sm" />
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

                                        {renderChip("active")}


                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="11actions"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-center"
                                    >
                                        <div className="relative flex items-center justify-end gap-2 cursor-pointer">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    < EllipsisVerticalIcon className="w-8 h-8 icon" />
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems}>
                                                    {(item) => (
                                                        <DropdownItem
                                                            key={item.key}
                                                            color={item.key === "delete" ? "danger" : "default"}
                                                            className={item.key === "delete" ? "text-danger" : ""}
                                                        >
                                                            {item.label}
                                                        </DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
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
                                            <Checkbox radius="sm" />

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
                                        {renderChip("pending")}
                                    </td>
                                    <td
                                        tabindex="-1"
                                        data-key="22actions"
                                        role="gridcell"
                                        className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-center"
                                    >
                                        <div className="relative flex items-center justify-end gap-2 cursor-pointer">

                                            <Dropdown>
                                                <DropdownTrigger>
                                                    < EllipsisVerticalIcon className="w-8 h-8 icon" />
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems}>
                                                    {(item) => (
                                                        <DropdownItem
                                                            key={item.key}
                                                            color={item.key === "delete" ? "danger" : "default"}
                                                            className={item.key === "delete" ? "text-danger" : ""}
                                                        >
                                                            {item.label}
                                                        </DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
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
