import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import {
    DeleteTradeByTradeHash,
    GetFullStrategyObjectByStrategyHash,
    ArchiveStrategyByStrategyHash,
    DeleteStrategyByStrategyHash,
    GetFullTradeObjectsByStrategyHash,
    ArchiveTradeByTradeHash
} from "@/app/client/supabase/SupabaseUserData.js";
import {
    RemoveKeyLocalStorage,
    clearAll,
    GetKeyLocalStorage
} from "@/app/client/caching/LocalStorageRouter";


export default function App({
    showTradeDeletionModal,
    setShowTradeDeletionModal,
    userId
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (showTradeDeletionModal) {
            onOpen();
            setShowTradeDeletionModal(false)
        }
    }, [showTradeDeletionModal, onOpen]);

    const handleTradeDeletion = async () => {
        setIsLoading(true);
        const strategyHash = GetKeyLocalStorage('strategyHash');
        const strategyObject = await GetFullStrategyObjectByStrategyHash(strategyHash, userId);


        if (strategyObject.length > 0) {
            const name = strategyObject.name;
            const description = strategyObject.description;
            const most_traded_sessions = strategyObject.most_traded_sessions;


            await ArchiveStrategyByStrategyHash(
                strategyHash,
                name,
                description,
                most_traded_sessions,
                userId
            );
            await DeleteStrategyByStrategyHash(strategyHash, userId);

            const trades = await GetFullTradeObjectsByStrategyHash(strategyHash, userId);
            if (trades) {
                trades.map(async (trade) => {
                    await ArchiveTradeByTradeHash(trade, userId);
                    await DeleteTradeByTradeHash(trade.trade_hash, userId);
                });
            }
        }

        setIsLoading(false);
        onClose();
        RemoveKeyLocalStorage('strategyName');
        clearAll();
        window.location.reload();
    }
    return (
        <>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} className="mb-[100px] sm:mb-[0px]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col gap-1 background-color rounded-t-md">
                                Confirm strategy deletion
                            </ModalHeader>

                            <ModalBody className="background-color">
                                <p className="font-normal">
                                    Strategy deletion is irreversible. Are you sure you want to delete this strategy?
                                </p>
                                <p className="font-normal">
                                    All trades associated with this strategy will also be deleted.
                                </p>

                            </ModalBody>
                            <ModalFooter className="background-color rounded-b-md">

                                {!isLoading ? (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                        onClick={handleTradeDeletion}
                                    >

                                        Delete strategy
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                    >
                                        <Spinner color="secondary" className="-ml-2 pr-5" size="sm" />
                                        Delete strategy
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
