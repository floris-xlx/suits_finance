import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { GetTradeMetadatByTradeHash, UpdateTradeByTradeHash } from "@/app/client/supabase/SupabaseUserData.js";
import { GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import { Tooltip as ToolTipNext } from "@nextui-org/react";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, QuestionMarkCircleIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Tabs, Tab } from "@nextui-org/react";

import PairnameAutocomplete from "@/app/components/ui/AutoComplete/PairnameAutoComplete.jsx";

export default function App({
    showTradeEditModal,
    setShowTradeEditModal,
    userId,
    callRefreshTradeLog
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState('opaque')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)
    const tradeHash = GetKeyLocalStorage('tradeHash');

    const [pairname, setPairname] = useState(null);
    const [newPairname, setNewPairname] = useState(null);
    const [positionSize, setPositionSize] = useState(null);
    const [pnl, setPnl] = useState(null);
    const [outcome, setOutcome] = useState(null);


    const HandleUpdatedTrade = async () => {
        const updatedTrade = {
            "newPairname": newPairname,
            "positionSize": positionSize,
            "pnl": pnl,
            "outcome": outcome
        }

        setIsLoading(true);
        await UpdateTradeByTradeHash(tradeHash, userId, updatedTrade);
        setIsLoading(false);

        onClose();

        callRefreshTradeLog(true);


    }

    const FetchTradeMetadata = async () => {
        const tradeMetadata = await GetTradeMetadatByTradeHash(tradeHash, userId);
        setPairname(tradeMetadata[0].pairname);
        setPositionSize(tradeMetadata[0].position_size);
        setPnl(tradeMetadata[0].pnl);

        if (tradeMetadata[0].outcome.length < 1)
            setOutcome("Unknown");
        else
            setOutcome(tradeMetadata[0].outcome);
    }

    useEffect(() => {
        if (showTradeEditModal) {
            FetchTradeMetadata();
            setIsLoadingData(false);

            setBackdrop(backdrop)
            onOpen();
            setShowTradeEditModal(false)
        }
    }, [showTradeEditModal, backdrop, onOpen]);

    return (
        <>
            <Modal
                backdrop={backdrop}
                isOpen={isOpen}
                onClose={onClose}
                className="mb-[100px] sm:mb-[0px]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col gap-1 bg-primary rounded-t-md text-primary">
                                Edit trade metadata
                            </ModalHeader>
                            <ModalBody className="bg-primary">
                                <p className="font-normal text-secondary text-sm">
                                    Amend any trade metadata incase of a mistake or change in the trade.
                                </p>
                                <div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-accent"
                                        >
                                            Trade hash
                                        </label>

                                        <div className="mt-1">

                                            <ToolTipNext className="font-normal bg-secondary"
                                                content="The trade hash is a static unique identifier and cannot be changed"
                                            >
                                                <input
                                                    id="tradeHash"
                                                    name="tradeHash"
                                                    type="tradeHash"
                                                    autoComplete="tradeHash"
                                                    placeholder={tradeHash}
                                                    required
                                                    disabled={true}
                                                    value={tradeHash}
                                                    className="block w-full appearance-none rounded-md input-field px-3 py-2  shadow-sm focus:outline-none focus:ring-2  focus:ring-indigo-500 sm:text-sm font-medium cursor-default select-none text-accent"
                                                />
                                            </ToolTipNext>

                                        </div>
                                    </div>

                                    < PairnameAutocomplete setPairname={setNewPairname} preloadedPairname={pairname} />

                                    <div>
                                        <div>
                                            <label
                                                htmlFor="positionSize"
                                                className="block text-sm font-medium text-accent mt-2"
                                            >
                                                Position size
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="positionSize"
                                                    name="positionSize"
                                                    type="number"
                                                    autoComplete="positionSize"

                                                    placeholder={positionSize}
                                                    onChange={(e) => setPositionSize(e.target.value)}
                                                    value={positionSize}
                                                    className="block w-full appearance-none rounded-md input-field px-3 py-2  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label
                                                htmlFor="pnl"
                                                className="block text-sm font-medium text-accent mt-2"
                                            >
                                                Profit & loss
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="pnl"
                                                    name="pnl"
                                                    type="number"
                                                    autoComplete="pnl"
                                                    placeholder={pnl}
                                                    onChange={(e) => setPnl(e.target.value)}
                                                    value={pnl}
                                                    className="block w-full appearance-none rounded-md input-field px-3 py-2  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mx-auto flex-col w-full">
                                        <label
                                            htmlFor="currency"
                                            className="block text-sm font-medium text-accent mt-2"
                                        >
                                            Outcome
                                        </label>

                                        {isLoadingData ? (
                                            <div className="overflow-hidden relative w-full rounded-md bg-secondary before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent">
                                                <div className="h-10 rounded-lg text-color"></div>
                                            </div>
                                        ) : (
                                            <Tabs
                                                key="lg"
                                                radius="md"
                                                aria-label="Tabs radius"
                                                selectedKey={outcome}
                                                onSelectionChange={setOutcome}
                                            >
                                                <Tab key="Win" title={<><ArrowTrendingUpIcon className="icon inline-block mr-1" />Win</>} />
                                                <Tab key="Loss" title={<><ArrowTrendingDownIcon className="icon inline-block mr-1" />Loss</>} />
                                                <Tab key="Running" title={<><ArrowsPointingOutIcon className="icon inline-block mr-1" />Running</>} />
                                                <Tab key="Unknown" title={<><QuestionMarkCircleIcon className="icon inline-block mr-1" />Unknown</>} />
                                            </Tabs>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="background-color rounded-b-md">

                                {!isLoading ? (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[var(--brand-purple-secondary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                        onClick={HandleUpdatedTrade}
                                    >
                                        Apply changes
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-brand-disabled py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                    >
                                        <Spinner color="secondary" className="-ml-2 pr-5" size="sm" />
                                        Apply changes
                                    </button>
                                )}

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}