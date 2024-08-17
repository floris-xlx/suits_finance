import React, { useState, useEffect, Fragment } from 'react';
import { fetchUserRoles, deleteUserRole } from '@/app/client/supabase/SupabaseUserData.js';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { DrawerHero, useDrawer } from "@/app/components/ui/Drawers/DrawerViewTrade";
import { refreshPage } from '@/app/client/hooks/refreshPage';
import InputField from '@/app/components/ui/InputFields/InputField';
import TabHorizontal from '@/app/components/ui/Tabs/TabHorizontalWithValue';
import CapitalizeFirstLetter from '@/app/client/hooks/formatting/CapitalizeLetter';
import { UserDeleteRoleSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';


const MemberTrade = ({ shouldUpdateUsers, setShouldUpdateUsers }) => {
    const { drawerRef: drawerRef_viewUser, handleOpenDrawer: handleOpenDrawer_viewUser } = useDrawer();
    const { modalRef: modalRef_flagUser, handleOpenModal: handleOpenModal_flagUser } = useModal();
    const { modalRef: modalRef_editUser, handleOpenModal: handleOpenModal_editUser } = useModal();
    const { modalRef: modalRef_freezeUser, handleOpenModal: handleOpenModal_freezeUser } = useModal();
    const { modalRef: modalRef_deleteUser, handleOpenModal: handleOpenModal_deleteUser } = useModal();


    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState("members");
    const [selectedKeys, setSelectedKeys] = useState(new Set(["All user roles"]));

    const [scopedUserId, setScopedUserId] = useState(null);
    const [scopedUserObject, setScopedUserObject] = useState(null);

    const memberStates = ["Members", "Pending"];
    const dropdownItems = [
        { key: "view", label: "View profile", onClick: handleOpenDrawer_viewUser },
        { key: "edit", label: "Edit user", onClick: handleOpenModal_editUser },
        { key: "flag", label: "Flag user", onClick: handleOpenModal_flagUser },
        { key: "freeze", label: "Freeze user", onClick: handleOpenModal_freezeUser },
        { key: "delete", label: "Delete user", onClick: handleOpenModal_deleteUser },
    ];

    const userPendingWarning = "This user is pending approval. You can view their profile but you cannot edit, flag, freeze or delete their roles until they are approved.";

    const StatusColors = {
        active: "bg-green-accent text-green border border-green-500/30",
        inactive: "bg-yellow-accent text-yellow border border-yellow-500/30",
        pending: "bg-blue-primary text-blue border border-blue-500/30",
    };

    const renderChip = (tradeStatus) => {
        const Text = StatusColors[tradeStatus] ? CapitalizeFirstLetter(tradeStatus) : "???";
        const chipColor = StatusColors[tradeStatus] ? StatusColors[tradeStatus] : "bg-input-primary text-gray-400";
        return (
            <div className={`flex gap-4 rounded-md py-[3px] px-[7px] w-fit ${chipColor}`}>
                <div className="text-[12px] font-normal flex flex-row gap-1 select-none mx-auto pl-[1px]">
                    {Text}
                </div>
            </div>
        );
    };

    const fetchAndSetUserRoles = async () => {
        const userRoles = await fetchUserRoles();
        setUsers(userRoles);
    };

    useEffect(() => {
        if (scopedUserId != null) {
            const user = users.find(user => (user.user_id || user.id) === scopedUserId);
            setScopedUserObject(user);
        }
    }, [scopedUserId, users]);

    useEffect(() => {
        fetchAndSetUserRoles();
    }, [shouldUpdateUsers]);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    const handleUserFreeze = () => {
        const userId = scopedUserId;
        console.log("Freezing user with id: ", userId);
    };

    const handleUserFlag = () => {
        const userId = scopedUserId;
        console.log("Flagging user with id: ", userId);
    };

    const handleUserEdit = () => {
        const userId = scopedUserId;
        console.log("Editing user with id: ", userId);
    };

    const handleUserView = () => {
        const userId = scopedUserId;
        console.log("Viewing user with id: ", userId);
    };

    const handleUserDelete = async () => {
        const userId = scopedUserId;
        const result = await deleteUserRole(userId);
        UserDeleteRoleSuccessNotification();
        fetchAndSetUserRoles();
    };


    const tableTd = `
    py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 group-data-[disabled=true]:cursor-not-allowed before:bg-default/40 data-[selected=true]:text-default-foreground group-aria-[selected=false]:group-data-[hover=true]:before:bg-default-100 group-aria-[selected=false]:group-data-[hover=true]:before:opacity-70 group-data-[first=true]:first:before:rounded-tl-lg group-data-[first=true]:rtl:first:before:rounded-tr-lg group-data-[first=true]:rtl:first:before:rounded-tl-[unset] group-data-[first=true]:last:before:rounded-tr-lg group-data-[first=true]:rtl:last:before:rounded-tl-lg group-data-[first=true]:rtl:last:before:rounded-tr-[unset] group-data-[middle=true]:before:rounded-none group-data-[last=true]:first:before:rounded-bl-lg group-data-[last=true]:rtl:first:before:rounded-br-lg group-data-[last=true]:rtl:first:before:rounded-bl-[unset] group-data-[last=true]:last:before:rounded-br-lg group-data-[last=true]:rtl:last:before:rounded-bl-lg group-data-[last=true]:rtl:last:before:rounded-br-[unset] text-start
    `

    const renderTableHeader = (key, label) => (
        <th
            data-sortable="true"
            tabIndex="-1"
            data-key={key}
            role="columnheader"
            aria-sort="none"
            className="group px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
            aria-describedby="react-aria-description-2"
        >
            {label}
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
    );


    const renderTableRow = (user, index) => (
        <tr
            data-first={index === 0}
            data-last={index === users.length - 1}
            role="row"
            aria-selected="false"
            tabIndex="-1"
            data-key={user.id}
            aria-labelledby={`react-aria5550266582-:r94:-${user.id}-name`}
            className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-default"
        >
            <td
                tabIndex="-1"
                data-key={`${user.id}header`}
                role="gridcell"
                className={tableTd}
            >
                <label
                    className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
                    id={`react-aria5550266582-:ran:${user.id}`}
                    aria-label="Select"
                    aria-labelledby={`react-aria5550266582-:ran:${user.id} react-aria5550266582-:r94:-${user.id}-name`}
                >
                    <Checkbox radius="sm" />
                </label>
            </td>

            <td
                tabIndex="-1"
                data-key={`${user.id}name`}
                role="rowheader"
                id={`react-aria5550266582-:r94:-${user.id}-name`}
                className={tableTd}
            >
                <div
                    tabIndex="-1"
                    className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                >
                    <span
                        tabIndex="-1"
                        className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large"
                    >
                        {user.user && user.user.profile_pic ? (
                            <img
                                src={user.user.profile_pic}
                                className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                alt={user.user.full_name}
                                data-loaded="true"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-brand-primary rounded-md">
                                <span className="text-white/50 text-xl">?</span>
                            </div>
                        )}
                    </span>
                    <div className="inline-flex flex-col items-start">
                        {user.user && user.user.full_name && (
                            <span className="text-small text-brand-primary">{user.user.full_name}</span>
                        )}
                        {user.email || user.user.email && (
                            <span className="text-tiny text-foreground-400">{user.email || user.user.email}</span>
                        )}
                    </div>
                </div>
            </td>
            <td
                tabIndex="-1"
                data-key={`${user.id}role`}
                role="gridcell"
                className={tableTd}
            >
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize text-default-500">{user.user ? user.user.role : user.role}</p>
                </div>
            </td>
            <td
                tabIndex="-1"
                data-key={`${user.id}status`}
                role="gridcell"
                className={tableTd}
            >
                {renderChip(user.user ? user.user.status : 'pending')}
            </td>
            <td
                tabIndex="-1"
                data-key={`${user.id}actions`}
                role="gridcell"
                className={tableTd}
            >
                <div className="relative flex items-center justify-end gap-2 cursor-pointer">
                    <Dropdown>
                        <DropdownTrigger>
                            <EllipsisVerticalIcon className="w-8 h-8 icon" />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems}>
                            {(item) => (
                                <DropdownItem
                                    key={item.key}
                                    color={item.key === "delete" ? "danger" : "default"}
                                    onClick={() => {
                                        setScopedUserId(user.user_id || user.id);
                                        item.onClick();
                                    }}
                                    className={`${item.key === "delete" ? "text-danger hover:text-white" : "hover:text-white"}`}
                                >
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </td>
        </tr>
    );

    return (
        <Fragment>
            <DrawerHero ref={drawerRef_viewUser} label="View user">
                <div className="gap-y-2 flex flex-col">
                    {scopedUserId && (
                        <ValueCopyChipInlineLabel
                            label="User ID"
                            value={scopedUserId}
                            copy={true}
                            hover={true}
                            isText={true}
                            notificationType='User Id'
                            width='full'
                        />
                    )}

                    {scopedUserObject && (
                        <ValueCopyChipInlineLabel
                            label="Email Address"
                            value={scopedUserObject.email || scopedUserObject.user.email}
                            copy={true}
                            hover={true}
                            isText={true}
                            notificationType='Email Address'
                            width='full'
                        />
                    )}
                </div>
            </DrawerHero>


            <Modal
                ref={modalRef_flagUser}
                buttonText={'Flag user'}
                title={'Flag'}
                onButtonPress={refreshPage}
            >
                <p className="text-primary">
                    flag user
                </p>
            </Modal>

            <Modal
                ref={modalRef_editUser}
                buttonText={'Edit user'}
                title={'Edit'}
                onButtonPress={refreshPage}
            >
                <p className="text-primary">
                    edit user
                </p>
            </Modal>

            <Modal
                ref={modalRef_freezeUser}
                buttonText={'Freeze user'}
                title={'Freeze'}
                onButtonPress={refreshPage}
            >
                <p className="text-primary">
                    Freeze user
                </p>
            </Modal>

            <Modal
                ref={modalRef_deleteUser}
                buttonText={'Delete user roles'}
                title={'Delete'}
                onButtonPress={handleUserDelete}
            >
                <p className="text-primary">
                    Are you sure you want to delete the roles for this user? This action cannot be undone.
                </p>
            </Modal>



            <div
                className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-md transition-transform-background motion-reduce:transition-none border border-primary bg-secondary"
                tabIndex="-1"
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
                                <TabHorizontal
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
                                tabIndex="0"
                                aria-describedby=""
                                className="min-w-full h-auto table-auto w-full"
                            >
                                <thead
                                    className="[&>tr]:first:rounded-lg hidden sticky top-0 z-20 [&>tr]:first:shadow-small"
                                    role="rowgroup"
                                >
                                    <tr role="row">
                                        {["Name", "Role", "Status"].map((header, index) => (
                                            renderTableHeader(header.toLowerCase(), header)
                                        ))}
                                    </tr>
                                </thead>
                                <tbody role="rowgroup">
                                    {users.length === 0 ? (
                                        <div className=" w-full flex flex-col mx-auto py-16">
                                            <Spinner label="Loading users..." color="warning" size="lg" />
                                        </div>
                                    ) : (
                                        users
                                            .filter(user => {
                                                if (user.status === null) {
                                                    user.status = "pending";
                                                }
                                                if (selectedTab.toLowerCase() === "members") {
                                                    return user.status.toLowerCase() !== "pending";
                                                }
                                                return user.status.toLowerCase() === selectedTab.toLowerCase();
                                            })
                                            .map((user, index) => (
                                                renderTableRow(user, index)
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MemberTrade;
