import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { DeleteTradeByTradeHash } from "@/app/client/supabase/SupabaseUserData.js";
import { GetKeyLocalStorage, RemoveKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

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
        const tradeHash = GetKeyLocalStorage('tradeHash');
        await DeleteTradeByTradeHash(tradeHash, userId);
        setIsLoading(false);
        onClose();
        window.location.reload();

        RemoveKeyLocalStorage('tradeHash');
    }

    return (
        <>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="mb-[100px] sm:mb-[0px]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col gap-1 background-color rounded-t-md">Confirm trade deletion</ModalHeader>
                            <ModalBody className="background-color">
                                <p className="font-normal">
                                    Trade deletion is irreversible. Are you sure you want to delete this trade?
                                </p>

                            </ModalBody>
                            <ModalFooter className="background-color rounded-b-md">
                                {!isLoading ? (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent brand-purple-background py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[var(--brand-purple-secondary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                        onClick={handleTradeDeletion}
                                    >
                                        Delete trade
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent brand-purple-background-disabled py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                    >
                                        <Spinner color="secondary" className="-ml-2 pr-5" size="sm" />
                                        Delete trade
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
