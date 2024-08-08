import React, { useCallback } from 'react';
import { DropdownItem, Dropdown, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import {
    BriefcaseIcon,
    PaintBrushIcon,
    CpuChipIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    NewspaperIcon
} from '@heroicons/react/24/outline';

import PropTypes from 'prop-types';

const ManagePendingTradesLayout = ({
    handleFilterWrapper,
    handleOpenSearch,
    handleOpenModal_customization,

    // states
    isInJournal,
    isGlobalAdmin,
    isInEditingModePendingTrades,
    isOrgMember,

    // triggers
    handleDropdown,
    setIsDropdownOpen,

    // children
    children
}) => {
    const handleFilterWrapperCallback = useCallback(handleFilterWrapper, []);
    const handleOpenSearchCallback = useCallback(handleOpenSearch, []);
    const handleOpenModal_customizationCallback = useCallback(handleOpenModal_customization, []);

    return (
        <Dropdown
            backdrop="blur"
            placement={'bottom-end'}
            onClose={() => setIsDropdownOpen(false)}
            onClick={handleDropdown}
        >
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">

                {(!isInJournal && !isInEditingModePendingTrades) && (
                    <DropdownItem key="filter" onPress={handleFilterWrapperCallback} textValue={"filter"}>
                        <div className="flex flex-row items-center p-2">
                            <FunnelIcon className="icon" />
                            <span className="text-secondary pl-3">Filters</span>
                        </div>
                    </DropdownItem>
                )}

                {!isInJournal && (
                    <DropdownItem key="search" onPress={handleOpenSearchCallback} textValue={'search'}>
                        <div className="flex flex-row items-center p-2">
                            <MagnifyingGlassIcon className="icon" />
                            <span className="text-secondary pl-3">Search</span>
                        </div>
                    </DropdownItem>
                )}

                {!isInJournal && (
                    <DropdownItem key="customization" onPress={handleOpenModal_customizationCallback} textValue='Customization'>
                        <div className="flex flex-row items-center p-2">
                            <PaintBrushIcon className="icon" />
                            <span className="text-secondary pl-3">Customization</span>
                        </div>
                    </DropdownItem>
                )}


            </DropdownMenu>
        </Dropdown>
    )
}

export default ManagePendingTradesLayout;

// validate the props
ManagePendingTradesLayout.propTypes = {
    handleFilterWrapper: PropTypes.func.isRequired,
    handleOpenSearch: PropTypes.func.isRequired,
    handleOpenModal_customization: PropTypes.func.isRequired,

    // states
    isInJournal: PropTypes.bool.isRequired,
    isGlobalAdmin: PropTypes.bool.isRequired,
    isInEditingModePendingTrades: PropTypes.bool.isRequired,
    isOrgMember: PropTypes.bool.isRequired,

    // triggers
    handleDropdown: PropTypes.func.isRequired,
    setIsDropdownOpen: PropTypes.func.isRequired,

    // children
    children: PropTypes.node.isRequired
};