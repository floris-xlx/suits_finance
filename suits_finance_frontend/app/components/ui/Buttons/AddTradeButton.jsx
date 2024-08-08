import React, { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";
import DatePickerSmall from "@/app/components/ui/Calenders/DatePickerSmall.jsx";
import ChartUploadButton from "@/app/components/ui/Buttons/ChartUploadButton.jsx";
import PairnameAutocomplete from "@/app/components/ui/AutoComplete/PairnameAutoComplete.jsx";
import TimePickerSmall from "@/app/components/ui/Calenders/TimePickerSmall.jsx";
import IsNumberNegative from "@/app/client/hooks/checkers/IsNumberNegative.js";
import { getTradingSession } from "@/app/client/hooks/datetime/RelativeDate.js";
import { AddTradeById } from "@/app/client/supabase/SupabaseUserData.js";
import InputField from "@/app/components/ui/InputFields/InputField.jsx";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner
} from "@nextui-org/react";
import {GetKeyLocalStorage} from "@/app/client/caching/LocalStorageRouter";

const AddTradeButton = ({
  setNotification,
  refreshTradeLog,
  setDoesUserHaveTrades
}) => {
  const { userId } = useRequireAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [secondTakeProfit, setSecondTakeProfit] = useState(null);
  const [thirdTakeProfit, setThirdTakeProfit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chartLink, setChartLink] = useState(null);
  const [pairname, setPairname] = useState(null);
  const [entryLevel, setEntryLevel] = useState(null);
  const [stoplossLevel, setStoplossLevel] = useState(null);
  const [takeProfitLevel, setTakeProfitLevel] = useState(null);
  const [takeProfitLevel2, setTakeProfitLevel2] = useState(null);
  const [takeProfitLevel3, setTakeProfitLevel3] = useState(null);

  const [isDataLoading, setIsDataLoading] = useState(false);

  // handle tp2
  function handleSecondTakeProfit() {
    setSecondTakeProfit(true);
  }

  // handle tp3
  function handleThirdTakeProfit() {
    setThirdTakeProfit(true);
  }


  const handleOpen = () => {
    onOpen();
  }

  const handleAddTrade = () => {
    const strategy_hash = GetKeyLocalStorage("strategyHash");
    refreshTradeLog(false);
    const time = GetKeyLocalStorage('NewTradetime')

    // the selectedData is in this format dd-mm-yyyy and time is in this format hh:mm
    const unixTime = new Date(`${selectedDate} ${time}`).getTime() / 1000;

    const trade = {
      user_id: userId,
      date: selectedDate,
      chart_link: chartLink,
      pairname: pairname,
      entry_level: entryLevel,
      stoploss_level: stoplossLevel,
      take_profit_level: takeProfitLevel,
      take_profit_level2: takeProfitLevel2,
      take_profit_level3: takeProfitLevel3,
      strategy: strategy_hash,
      unix_time: unixTime,
      session: getTradingSession(unixTime) // we convert the date to unix time and then get the trading session
    }

    if (!dateIsNull(selectedDate)) {
      return;
    }

    if (!entryIsNull(entryLevel)) {
      return;
    }

    if (!stoplossIsNull(stoplossLevel)) {
      return;
    }

    if (!takeProfitIsNull(takeProfitLevel)) {
      return;
    }

    if (isLevelNegative(entryLevel)) {
      return;
    }

    if (isLevelNegative(stoplossLevel)) {
      return;
    }

    if (isLevelNegative(takeProfitLevel)) {
      return;
    }

    if (takeProfitLevel2 !== null) {
      if (isLevelNegative(takeProfitLevel2)) {
        return;
      }
    }

    if (takeProfitLevel3 !== null) {
      if (isLevelNegative(takeProfitLevel3)) {
        return;
      }
    }

    setIsDataLoading(true);
    const trade_hash = AddTradeById(trade, userId, unixTime);

    trade_hash.then(hash => {
      setIsDataLoading(false);
      onClose();
      setEntryLevel(null);
      setStoplossLevel(null);
      setTakeProfitLevel(null);
      setTakeProfitLevel2(null);
      setTakeProfitLevel3(null);
      setSelectedDate(null);
      setChartLink(null);
      setPairname(null);



      refreshTradeLog(true);
      setDoesUserHaveTrades(true);
    }).catch(error => {

      console.error("Error generating trade hash:", error);
      setIsDataLoading(false);
    });

  }

  function isLevelNegative(level) {
    if (IsNumberNegative(level)) {
      setNotification("NumberCannotBeNegative");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return true;
    }
    return false;
  }

  function dateIsNull(selectedDate) {
    if (selectedDate === null) {
      setNotification("DateCannotBeEmpty");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return false;
    }
    return true;
  }

  function entryIsNull(selectedDate) {
    if (entryLevel === null) {
      setNotification("EntryCannotBeEmpty");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return false;
    }
    return true;
  }

  function stoplossIsNull(selectedDate) {
    if (stoplossLevel === null) {
      setNotification("StopLossCannotBeEmpty");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return false;
    }
    return true;
  }

  function takeProfitIsNull(selectedDate) {
    if (takeProfitLevel === null) {
      setNotification("TakeProfitCannotBeEmpty");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return false;
    }
    return true;
  }

  return (
    <div>
      <>
        <div className="flex flex-wrap gap-3">

          <Button
            key="blur"
            variant="flat"
            color="warning"
            onPress={() => handleOpen("blur")}
            className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 h-[43px] text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition w-full"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Trade
          </Button>

        </div>

        <Modal
          backdrop={"blur"}
          isOpen={isOpen}
          onClose={onClose}
          className="mb-[75px] sm:mb-0"
          scrollBehavior="inside"
        >

          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader
                  className="flex flex-col gap-1 background-color rounded-t-md">
                  Add a trade
                </ModalHeader>

                <ModalBody className="background-color">
                  <p>
                    < DatePickerSmall setSelectedDate={setSelectedDate} />
                    < TimePickerSmall />
                    < ChartUploadButton setNotification={setNotification} />
                    < PairnameAutocomplete setPairname={setPairname} />

                    < InputField padding={0} label={"Entry level"} value={entryLevel} setValue={(e) => setEntryLevel(e.target.value)} marginTop={2} />
                    < InputField padding={0} label={"Stoploss level"} value={stoplossLevel} setValue={(e) => setStoplossLevel(e.target.value)} marginTop={2} />
                    < InputField padding={0} label={"Take profit level"} value={takeProfitLevel} setValue={(e) => setTakeProfitLevel(e.target.value)} marginTop={2} />


                    {secondTakeProfit === null ? (
                      <div>
                        <button className="group p-2 sm:p-2 block cursor-pointer text-center border-2 border-dotted border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2  w-full border-color hover:border-[var(--text-color-accent-secondary)] transition mt-2"
                          onClick={handleSecondTakeProfit}
                        >
                          <PlusIcon className="mx-auto icon-color size-100 h-5 w-5" aria-hidden="true" />
                          <span className="mt-2 block text-sm text-color-accent font-normal">
                            Add another take profit level
                          </span>
                        </button>
                      </div>
                    ) : (
                      < InputField padding={0} label={"Take profit level 2"} value={takeProfitLevel2} setValue={(e) => setTakeProfitLevel2(e.target.value)} marginTop={2} />
                    )}

                    {secondTakeProfit !== null && (
                      thirdTakeProfit === null ? (

                        <div>
                          <button className="group p-2 sm:p-2 block cursor-pointer text-center border-2 border-dotted border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2  w-full border-color hover:border-[var(--text-color-accent-secondary)] transition mt-2"
                            onClick={handleThirdTakeProfit}
                          >
                            <PlusIcon className="mx-auto icon-color size-100 h-5 w-5" aria-hidden="true" />
                            <span className="mt-2 block text-sm text-color-accent font-normal">
                              Add another take profit level
                            </span>
                          </button>
                        </div>

                      ) : (
                        <InputField padding={0} label={"Take profit level 3"} value={takeProfitLevel3} setValue={(e) => setTakeProfitLevel3(e.target.value)} marginTop={2} />
                      )
                    )}

                  </p>
                </ModalBody>
                <ModalFooter className="background-color rounded-b-md">

                  {!isDataLoading ? (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent brand-purple-background py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[var(--brand-purple-secondary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                      onClick={handleAddTrade}
                    >
                      Add trade
                    </button>

                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent brand-purple-background-disabled py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition items-center cursor-default"
                      disabled
                    >
                      <Spinner color="secondary" className="-ml-2 pr-5" size="sm" /> 
                      Add trade
                    </button>

                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default AddTradeButton;