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
    handleOpenModal_changeOrganization,
    handleOpenModal_algorithms,
    handleOpenModal_algoMonitor,
    handleOpenModal_econEvents,

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
    const handleOpenModal_changeOrganizationCallback = useCallback(handleOpenModal_changeOrganization, []);
    const handleOpenModal_algorithmsCallback = useCallback(handleOpenModal_algorithms, []);
    const handleOpenModal_algoMonitorCallback = useCallback(handleOpenModal_algoMonitor, []);
    const handleOpenModal_newsEventsCallback = useCallback(handleOpenModal_econEvents, []);

    return (
        <Dropdown
            backdrop="blur"
            placement={'bottom-end'}
            //onOpenChange={handleDropdown} 
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



                {isGlobalAdmin && (
                    <DropdownItem key="organization" onPress={handleOpenModal_changeOrganizationCallback} textValue='organization'>
                        <div className="flex flex-row items-center p-2">
                            <BriefcaseIcon className="icon" />
                            <span className="text-secondary pl-3">Organization</span>
                        </div>
                    </DropdownItem>
                )}



                {/* 

                {!isInJournal && !isOrgMember && (
                    <DropdownItem key="algorithms" onPress={handleOpenModal_algorithmsCallback} textValue="algorithms">
                        <div className="flex flex-row items-center p-2">
                            <CpuChipIcon className="icon" />
                            <span className="text-secondary pl-3">Switch algorithms</span>
                        </div>
                    </DropdownItem>
                )} 

                */}

                {(!isInJournal || isOrgMember) && (
                    <DropdownItem key="algoMonitor" onPress={handleOpenModal_algoMonitorCallback} textValue="algorithmMonitor">
                        <div className="flex flex-row items-center p-2">
                            <EyeIcon className="icon" />
                            <span className="text-secondary pl-3">Algorithm Monitor</span>
                        </div>
                    </DropdownItem>
                )}

                {!isInJournal && (
                    <DropdownItem key="search" onPress={handleOpenModal_econEvents} textValue={'news_events'}>
                        <div className="flex flex-row items-center p-2">
                            <NewspaperIcon className="icon" />
                            <span className="text-secondary pl-3">Econ events</span>
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
    handleOpenModal_changeOrganization: PropTypes.func.isRequired,
    handleOpenModal_algorithms: PropTypes.func.isRequired,
    handleOpenModal_algoMonitor: PropTypes.func.isRequired,
    handleOpenModal_newsEvents: PropTypes.func.isRequired,

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