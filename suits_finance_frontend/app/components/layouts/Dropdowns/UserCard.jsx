
import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Cog8ToothIcon, PowerIcon } from '@heroicons/react/24/outline';
import handleSignOut from '@/app/auth/hooks/HandleSignOut';
import PropTypes from 'prop-types';

// render the content inside the dropdown for the user card layout
const UserCardLayout = ({
    children,
    handleDropdownUser,
    setIsDropdownUserOpen
}) => {

    const handleSendToSettingsRoute = () => {
        const link = "/settings";
        if (link !== undefined) {
            window.location.href = link;
        }
    }

    return (
        <Dropdown backdrop="blur" placement={'bottom-end'} onOpenChange={handleDropdownUser} onClose={() => setIsDropdownUserOpen(false)}>
            <DropdownTrigger>
                {React.cloneElement(children, { onClick: handleDropdownUser })}
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
                <DropdownItem key="settings" onPress={handleSendToSettingsRoute} textValue="settings">
                    <div className="flex flex-row items-center p-2">
                        <Cog8ToothIcon className="icon" />
                        <span className="text-secondary pl-3">Settings</span>
                    </div>
                </DropdownItem>

                <DropdownItem key="signOut" onPress={handleSignOut} textValue="signOut">
                    <div className="flex flex-row items-center p-2">
                        <PowerIcon className="icon" />
                        <span className="text-secondary pl-3">Sign out</span>
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )

}

UserCardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    handleDropdownUser: PropTypes.func.isRequired,
    setIsDropdownUserOpen: PropTypes.func.isRequired
};

export default UserCardLayout;