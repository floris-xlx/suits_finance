'use client';
// user logged in card mainly used in the manager page

import React, { useState, useEffect } from 'react';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import {
  PaintBrushIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import CapitalizeFirstLetter from '@/app/client/hooks/formatting/CapitalizeLetter';
import { ProfilePicTiny } from '@/app/components/ui/User/User';
import { IsUserIdGlobalAdmin } from '@/app/client/supabase/SupabaseOrgData';
import ButtonIcon from '@/app/components/ui/Buttons/ButtonIcon';
import { Button } from "@nextui-org/react";
// caching local storage
import FilterRouterModal from '@/app/components/layouts/Modals/filterRouter';
// da modal component
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { refreshPage } from '@/app/client/hooks/refreshPage';

// zustand
import { useLoadingStore, useLayoutStore, useUserStore, useUserViewStore, useOrganizationStore } from '@/app/stores/stores';

// modal layouts
import { CustomizeLayoutPending } from '@/app/components/layouts/Modals.jsx';
import ManagePendingTradesLayout from '@/app/components/layouts/Dropdowns/ManagePendingTrades';
import UserCardLayout from '@/app/components/layouts/Dropdowns/UserCard';

import PropTypes from 'prop-types';

const LoggedInUserCard = ({
  username,
  profilePicture,
  desktopView,
  setIsPaletteSearchOpen
}) => {
  const { modalRef: modalRef_customization, handleOpenModal: handleOpenModal_customization } = useModal(); // customization modal
  const { modalRef: modalRef_filter, handleOpenModal: handleOpenModal_filter } = useModal();


  // zustand
  const { loading } = useLoadingStore();
  const { layout, setLayoutToPendingTrades, setLayoutToAlgorithmSettings } = useLayoutStore();
  const { view, setDrilldownTradeHashPendingTrades, setEditingModePendingTrades, setIsInDropdownPendingTrades, setIsInDropdownUserSettings } = useUserViewStore();
  const { organization } = useOrganizationStore();
  const { user, setIsAdmin } = useUserStore();

  // check if user is global admin
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);

  useEffect(() => {
    if (user.admin === false || user.admin === null) {
      const fetchData = async () => {
        await IsUserIdGlobalAdmin(user.id).then((data) => {
          setIsAdmin(data);
        });
      };
      fetchData();
    }
  }, [user.id]);


  // handle filter by button press
  const handleFilterBy = () => {
    refreshPage();
  };

  const resetDrilldownTradeView = () => {
    setDrilldownTradeHashPendingTrades(null);
    setEditingModePendingTrades(false);

    // Remove the query param trade_hash
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('trade_hash');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleDropdown = () => {
    if (isDropdownOpen) {
      setIsInDropdownPendingTrades(false);
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
      setIsInDropdownPendingTrades(true);
    }
  }

  const handleDropdownUser = () => {
    if (isDropdownUserOpen) {
      setIsInDropdownUserSettings(false);
      setIsDropdownUserOpen(false);
    } else {
      setIsDropdownUserOpen(true);
      setIsInDropdownUserSettings(true);
    }
  }

  const handleFilterWrapper = () => {
    handleOpenModal_filter();
  }

  const handleOpenSearch = () => {
    setIsPaletteSearchOpen((prevState) => !prevState);
  }

  return (
    <>
      <Modal
        ref={modalRef_customization}
        buttonText={'Close'}
        title={'Customize layout'}
      >
        <CustomizeLayoutPending />
      </Modal>
      <Modal
        ref={modalRef_filter}
        buttonText={'Apply'}
        title={'Pick a filter'}
        onButtonPress={handleFilterBy}
      >
        <FilterRouterModal />
      </Modal>


      <div className="ml-[11px] z-0 px-2 ">
        {loading.authLoading ? (
          <div className="h-[60px] w-[135px]">
            <SkeletonLoader width={'full'} />
          </div>
        ) : (

          <div className="ml-[5px] flex flex-row gap-3 items-center py-3 sm:justify-normal justify-between ">
            {!desktopView && (
              < UserCardLayout handleDropdownUser={handleDropdownUser} setIsDropdownUserOpen={setIsDropdownUserOpen}>

                <button
                  className={`rounded-md p-2 flex flex-row items-center gap-3 hover:bg-accent hover:transition cursor-pointer ${desktopView ? 'bg-secondary' : 'bg-primary'
                    } -ml-[10px] select-none`}
                >
                  <ProfilePicTiny profilePicture={profilePicture} />

                  <div className="text-left">
                    <p className="text-primary font-semibold">
                      {CapitalizeFirstLetter(username)}
                    </p>

                    <p className="text-secondary text-xs select-none">
                      {user.organization}
                    </p>

                  </div>
                </button>
              </UserCardLayout>
            )}

            {/* desktop header */}
            <div className="flex flex-row gap-x-3 ">
              <div className="hidden md:flex gap-x-3 flex-row">

                <ButtonIcon onPress={handleOpenModal_filter}>
                  <FunnelIcon className="icon" />
                </ButtonIcon>

                <ButtonIcon onPress={handleOpenSearch} hide={view.isInJournal}>
                  <MagnifyingGlassIcon className="icon" />
                </ButtonIcon>

                <ButtonIcon onPress={handleOpenModal_customization} >
                  <PaintBrushIcon className="icon" />
                </ButtonIcon>
              </div>

              {/* mobile dropdown */}
              <div className="md:hidden flex !z-50">

                < ManagePendingTradesLayout
                  handleFilterWrapper={handleFilterWrapper}
                  handleOpenSearch={handleOpenSearch}
                  handleOpenModal_customization={handleOpenModal_customization}
                  isInJournal={view.isInJournal}
                  isGlobalAdmin={user.admin}
                  isInEditingModePendingTrades={view.isEditingModePendingTrades}
                  isOrgMember={organization.isMember}
                  handleDropdown={handleDropdown}
                  setIsDropdownOpen={setIsDropdownOpen}
                >

                  <Button
                    className="bg-transparent">
                    <Bars3Icon className="icon" />
                  </Button>

                </ManagePendingTradesLayout>

              </div>
            </div>

            {desktopView && (
              <div className="mr-[4px] pl-[10px]">

                < UserCardLayout handleDropdownUser={handleDropdownUser} setIsDropdownUserOpen={setIsDropdownUserOpen}>

                  <button
                    className={`rounded-md p-2 flex flex-row items-center gap-3 hover:bg-accent hover:transition cursor-pointer ${desktopView ? 'bg-secondary' : 'bg-primary'
                      } -ml-[10px] select-none`}
                  >

                    <ProfilePicTiny profilePicture={profilePicture} />

                    <div className="text-left">
                      <p className="text-primary font-semibold">
                        {CapitalizeFirstLetter(username)}
                      </p>

                      <p className="text-secondary text-xs select-none">
                        {user.organization}
                      </p>

                    </div>
                  </button>
                </UserCardLayout>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LoggedInUserCard;


LoggedInUserCard.propTypes = {
  username: PropTypes.string,
  profilePicture: PropTypes.string,
  desktopView: PropTypes.bool,
  setIsPaletteSearchOpen: PropTypes.func
};