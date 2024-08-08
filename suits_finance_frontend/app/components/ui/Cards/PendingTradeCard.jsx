import React, { useState, useEffect } from 'react';
import { TrashIcon, EyeIcon, CheckIcon, ArchiveBoxIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { copyToClipboard } from '@/app/client/hooks/copytoClipboard';
import DirectionChip from '@/app/components/ui/Chips/DirectionChip';
import {
  GetAlertStatusByTradeHash,
  UpdateTradeStatus,
  UpdateArchiveTrade
} from '@/app/client/supabase/SupabaseTradeData';
import {
  GetKeyLocalStorage,
  RemoveKeyLocalStorage
} from '@/app/client/caching/LocalStorageRouter';
import SendTp from '@/app/client/api/SendTp';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';
import ButtonIcon from '@/app/components/ui/Buttons/ButtonIcon';
import TradeStatusChip from '@/app/components/ui/Chips/TradeStatusChip';
import { refreshPage } from '@/app/client/hooks/refreshPage';
import { ApproveSignalTradesByRob } from '@/app/client/api/ApproveTrade';
import { TimeframeChip } from '@/app/components/ui/XylexUI';
import TimeChip from '@/app/components/ui/Chips/TimeChip';
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { AddAuditLogEntry, AddAuditLogTradesEntry } from '@/app/client/supabase/SupabaseOrgData';

// zustand
import { useUserViewStore } from '@/app/stores/user-view-store';

// modal layouts
import ApproveTrade from '@/app/components/layouts/Modals/approveTrade';
import ManualAlertTrade from '@/app/components/layouts/Modals/manualAlertTrade';
import InvalidateTrade from '@/app/components/layouts/Modals/invalidateTrade';
import ArchiveTrade from '@/app/components/layouts/Modals/archiveTrade';
import UpdateTradeStatusLayout from '@/app/components/layouts/Modals/updateTradeStatus';
import PositionSizeCalculator from '@/app/components/layouts/Modals/positionSizeCalculator';

import { SignalApprovedSuccessNotification, TradeArchivedSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import {
  useUserPreferencesStore,
  useOrganizationStore
} from '@/app/stores/stores';


// views
import PendingTradeDrilldownView from '@/app/components/layouts/Views/PendingTradeDrilldownView';


import PropTypes from 'prop-types';


const PendingTradeCard = ({
  trade,
  index,
  triggerNotification,
  setCurrentDrilldownTradeHash,
  marginTop = null,
}) => {
  // zustand
  const { view, setEditingModePendingTrades, setDrilldownTradeHashPendingTrades } = useUserViewStore();
  const { preferences } = useUserPreferencesStore();
  const { organization } = useOrganizationStore();

  // create the modal ref instances
  const { modalRef: modalRef_manualTp, handleOpenModal: handleOpenModal_manualTp } = useModal(); // manual tp modal
  const { modalRef: modalRef_invalidate, handleOpenModal: handleOpenModal_invalidate } = useModal(); // invalidate modal
  const { modalRef: modalRef_approve, handleOpenModal: handleOpenModal_approve } = useModal(); // approve modal
  const { modalRef: modalRef_archive, handleOpenModal: handleOpenModal_archive } = useModal(); // archive modal
  const { modalRef: modalRef_updateTradeStatus, handleOpenModal: handleOpenModal_updateTradeStatus } = useModal(); // update trade status modal
  const { modalRef: modalRef_positionSizeCalculator, handleOpenModal: handleOpenModal_positionSizeCalculator } = useModal(); // position size calculator modal



  const username = GetKeyLocalStorage('username');
  const userId = GetKeyLocalStorage('userId');
  const route = '/manage'

  // handle approve trade
  const handleApproveTrade = async () => {
    try {
      await UpdateTradeStatus(trade.trade_hash, 'pending');

      // audit log shit
      const action = 'approved trade signal with hash ' + trade.trade_hash;
      await AddAuditLogEntry(username, userId, route, action);

      const status = await ApproveSignalTradesByRob(trade.trade_hash);

      if (status === 200) {

        SignalApprovedSuccessNotification({
          algorithm_id: trade.algorithm_id,
          trade_hash: trade.trade_hash
        });

        await AddAuditLogTradesEntry({
          tradeHash: trade.trade_hash,
          action: "approved unapproved trade",
          route: "/manage"
        })
        //updatePendingTrades(trade.trade_hash)

        setTimeout(() => {
          refreshPage();
        }, 1000);

      }
    } catch (error) {
      console.error('Error approving trade:', error);
    }
  };

  // end of handle approve trade

  // handle invalidate trade
  const handleButtonInvalidate = async () => {
    try {
      await UpdateTradeStatus(trade.trade_hash, 'invalid', false);

      // call audit log
      const action = 'invalidated trade with hash ' + trade.trade_hash;
      await AddAuditLogEntry(username, userId, route, action);

      refreshPage();
    } catch (error) {
      console.error('Error updating trade status:', error);
    }
  };

  // fetch the alert status
  useEffect(() => {
    const fetchAlertStatus = async () => {
      if (view.isEditingModePendingTrades) {
        try {
          const alertStatus = await GetAlertStatusByTradeHash(trade.trade_hash);
          

        } catch (error) {
          console.error('Error fetching alert status:', error);
        }
      }
    };
    fetchAlertStatus();
  }, [trade.trade_hash, view.isEditingModePendingTrades]);


  // handle manual alert
  const handleManualAlert = async () => {
    try {
      const tp_type = GetKeyLocalStorage(
        'cachedManualAlertTradeTp'
      ).toLowerCase();

      await SendTp(trade.trade_hash, tp_type);
      RemoveKeyLocalStorage('cachedManualAlertTradeTp');

      // call audit log
      const action = 'called manual tp ' + tp_type + ' for trade with hash ' + trade.trade_hash;
      await AddAuditLogEntry(username, userId, route, action);

    } catch (error) {
      console.error('Error sending manual alert:', error);
    }
  };

  // handle edit click
  const handleEditClick = () => {
    setCurrentDrilldownTradeHash(trade.trade_hash);
    setDrilldownTradeHashPendingTrades(trade.trade_hash);

    // append current trade_hash as query param
    const url = new URL(window.location);
    url.searchParams.set('trade_hash', trade.trade_hash);
    window.history.pushState({}, '', url);

    // zustand
    setEditingModePendingTrades(!view.isEditingModePendingTrades);

    if (view.isEditingModePendingTrades) {
      setCurrentDrilldownTradeHash(null);
      setDrilldownTradeHashPendingTrades(null);
      // set the url to /manage
      window.history.pushState({}, '', '/manage');
    }
  };


  const handleArchiveTrade = async () => {
    try {
      await UpdateArchiveTrade(trade.trade_hash);
      refreshPage();

      // call audit log
      const action = 'archived trade with hash ' + trade.trade_hash;
      await AddAuditLogEntry(username, userId, route, action);

      TradeArchivedSuccessNotification();
      setEditingModePendingTrades(false);

    } catch (error) {
      console.error('Error archiving trade:', error);
    }
  };


  const handlePositionSizeCalculator = () => {
    handleOpenModal_positionSizeCalculator();
  }


  return (
    <div className={`${view.isEditingModePendingTrades ? '' : marginTop}`}>
      <Modal
        ref={modalRef_invalidate}
        buttonText={'Invalidate alert'}
        title={'Trade invalidation confirmation'}
        onButtonPress={handleButtonInvalidate}
      >
        < InvalidateTrade
          trade_hash={trade.trade_hash}
        />
      </Modal>

      <Modal
        ref={modalRef_updateTradeStatus}
        buttonText={'Update'}
        title={'Change trade status'}
        onButtonPress={refreshPage}
      >
        < UpdateTradeStatusLayout
          trade_hash={trade.trade_hash}
        />
      </Modal>

      <Modal
        ref={modalRef_positionSizeCalculator}
        buttonText={'Close'}
        title={'Position size calculator'}
        onButtonPress={handlePositionSizeCalculator}
      >
        < PositionSizeCalculator
          symbol={trade.pairname}
          stoplossPips={trade.sl_pips}
        
        />
      </Modal>

      <Modal
        ref={modalRef_manualTp}
        buttonText={'Send alert'}
        title={'Call manual alert'}
        onButtonPress={handleManualAlert}
      >
        < ManualAlertTrade />
      </Modal>

      <Modal
        ref={modalRef_approve}
        buttonText={'Approve trade'}
        title={'Approve trade'}
        onButtonPress={handleApproveTrade}
      >
        < ApproveTrade />
      </Modal>

      <Modal
        ref={modalRef_archive}
        buttonText={'Archive trade'}
        title={'Archive trade'}
        onButtonPress={handleArchiveTrade}
      >
        < ArchiveTrade trade_hash={trade.trade_hash} />
      </Modal>





      <div
        key={index}
        className={` transition-size ease-in-out z-10 ${view.isEditingModePendingTrades ? ' !h-fit sm:!h-[98vh] !z-50 p-[20px] !px-[0px] sm:!px-[20px]  !overflow-hidden sm:min-w-[450px] w-full ' : `w-[350px]  xxs:w-96  h-fit   p-4 border border-primary`
          } text-primary rounded-md mb-4 flex mx-auto flex-col `}
      >

        <div >
          <div className={`flex flex-row 0 ${view.isEditingModePendingTrades ? 'mt-[80px]' : ''}`}>
            <div className={`pl-2 pt-1 text-nowrap ${view.isEditingModePendingTrades ? 'w-[300px] sm:w-[200px]' : 'w-[200px]'}`}>
              <div className="font-semibold text-md flex flex-row gap-x-[56px]">
                <span className="select-none  text-[14px] sm:text-[18px]">{trade.pairname}</span>

                <div className="flex ml-[17px] sm:ml-[4px]">
                  <DirectionChip direction={trade.direction} />
                </div>
              </div>

              <div className="w-[350px]">
                {/* render 5x ValueCopyChipInlineLabel components */}
                {[
                  {
                    value: trade.entry_level,
                    notificationType: 'Entry level',
                    label: 'Entry Level',
                    showRr: false,
                    pips: 0,
                    showPips: false
                  },
                  {
                    value: trade.stoploss_level,
                    notificationType: 'Stoploss level',
                    label: 'Stoploss Level',
                    showRr: false,
                    pips: trade.sl_pips,
                    showPips: preferences.showPipsOnPendingTrade && view.isEditingModePendingTrades
                  },
                  {
                    value: trade.tp1_level,
                    notificationType: 'TP1 Level',
                    label: 'TP1 Level',
                    showRr: true,
                    Rr: trade.tp1_rr,
                    pips: trade.tp1_pips,
                    showPips: preferences.showPipsOnPendingTrade && view.isEditingModePendingTrades
                  },
                  {
                    value: trade.tp2_level,
                    notificationType: 'TP2 level',
                    label: 'TP2 Level',
                    showRr: true,
                    Rr: trade.tp2_rr,
                    pips: trade.tp2_pips,
                    showPips: preferences.showPipsOnPendingTrade && view.isEditingModePendingTrades
                  },
                  {
                    value: trade.tp3_level,
                    notificationType: 'TP3 level',
                    label: 'TP3 Level',
                    showRr: true,
                    Rr: trade.tp3_rr,
                    pips: trade.tp3_pips,
                    showPips: preferences.showPipsOnPendingTrade && view.isEditingModePendingTrades
                  }
                ].map((item, index) => (
                  <div key={index} className="flex flex-row items-center">
                    <ValueCopyChipInlineLabel
                      value={item.value}
                      copy={true}
                      triggerNotification={triggerNotification}
                      notificationType={item.notificationType}
                      label={item.label}
                      Rr={item.Rr}
                      showRr={item.showRr && preferences.showRrOnPendingTrade}
                      pips={item.pips}
                      showPips={item.showPips}
                    />
                  </div>
                ))}

                {preferences.showPipsAwayOnPendingTrade && (
                  <div className="flex flex-row items-center">
                    <ValueCopyChipInlineLabel
                      value={trade.pips_away}
                      copy={false}
                      label={'Pips away'}
                    />
                  </div>
                )}

                {preferences.showCurrentPriceOnPendingTrade && (
                  <div className="flex flex-row items-center">
                    <ValueCopyChipInlineLabel
                      value={trade.current_price}
                      copy={false}
                      label={'Current price'}
                      hover={false}
                    />
                  </div>
                )}
                <div className="flex flex-row items-center">
                  <ValueCopyChipInlineLabel
                    value={trade.algorithm_id}
                    copy={false}
                    label={'Algorithm ID'}
                    isText={true}
                    hover={false}
                  />
                </div>

                <TimeChip
                  time={trade.created_at}
                  show={preferences.showTimeOnPendingTrade}
                />

                {trade.tp3_level === 0 && (
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row justify-between items-center">
                      <p className="select-none w-[110px]"></p>
                      <span
                        className={`h-[36px]`}
                      >

                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="flex flex-col w-full">
              <div>
                <div className="flex justify-end ">
                  <div className="flex flex-col gap-y-1">

                    <ButtonIcon onPress={handleEditClick}>
                      <EyeIcon className="h-6 w-6 text-accent" />
                    </ButtonIcon>

                    <ButtonIcon onPress={handleOpenModal_invalidate} hide={organization.isMember}>
                      <TrashIcon className="h-6 w-6 text-accent" />
                    </ButtonIcon>

                    <ButtonIcon onPress={handleOpenModal_archive} hide={trade.awaiting_archive || organization.isMember}>
                      <ArchiveBoxIcon className="h-6 w-6 text-accent" />
                    </ButtonIcon>

                    <ButtonIcon onPress={handleOpenModal_approve} hide={trade.trade_status !== 'unapproved' || organization.isMember}>
                      <CheckIcon className="h-6 w-6 text-accent" />
                    </ButtonIcon>

                    <ButtonIcon onPress={handleOpenModal_positionSizeCalculator} >
                      <CalculatorIcon className="h-6 w-6 text-accent" />
                    </ButtonIcon>

                  </div>
                </div>
              </div>

              <div className=" flex  flex-row justify-end h-full">
                <div className="flex flex-col justify-end">


                  <div
                    className={`flex ${trade.trade_status === 'unapproved' ? 'flex-col' : 'flex-row'}  gap-1`}
                  >

                    {trade.trade_status === 'unapproved' || trade.trade_status === 'pending' ? (
                      <div className="flex justify-end flex-col items-end gap-1 mt-4">
                        {preferences.showTimeframeOnPendingTrade && (
                          <TimeframeChip timeframe={trade.timeframe} />
                        )}
                        <TradeStatusChip tradeStatus={trade.trade_status} />
                      </div>
                    ) : (
                      <>
                        <TradeStatusChip tradeStatus={trade.trade_status} />
                        {preferences.showTimeframeOnPendingTrade && (
                          <TimeframeChip timeframe={trade.timeframe} />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="">
            <p
              className={`rounded-md bg-input-primary text-accent p-1 text-center text-[12px] xxs:text-[14px] cursor-pointer hover:bg-accent hover:transition border border-primary  ${view.isEditingModePendingTrades ? 'mt-[20px]' : 'mt-2'
                } select-none`}
              onClick={() => copyToClipboard(trade.trade_hash, triggerNotification, "Trade hash")}>
              {trade.trade_hash}
            </p>
          </div>
        </div>

        {/* in drilldown view */}
        <PendingTradeDrilldownView
          trade={trade}
          hide={!view.isEditingModePendingTrades}
          handleOpenModal_manualTp={handleOpenModal_manualTp}
          handleOpenModal_updateTradeStatus={handleOpenModal_updateTradeStatus}
        />

      </div>
    </div>
  );
};

export default PendingTradeCard;

PendingTradeCard.propTypes = {
  trade: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  triggerNotification: PropTypes.func.isRequired,
  setCurrentDrilldownTradeHash: PropTypes.func.isRequired,
  marginTop: PropTypes.string
};