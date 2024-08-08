import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
    Modal as NextModal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
    useDisclosure
} from '@nextui-org/react';

const Modal = forwardRef(({
    buttonText,
    title,
    buttonColor = 'primary',
    children,
    onButtonPress = () => {},
    buttonHide = false,
}, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpenModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
        handleOpenModal,
    }));

    useEffect(() => {
        if (isModalOpen) {
            onOpen();
        } else {
            onClose();
        }
    }, [isModalOpen, onOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    const buttonColorPrimary = 'bg-brand-primary hover:bg-brand-secondary transition text-white';
    const buttonColorSecondary = 'bg-red-primary hover:bg-red-highlight transition text-white';
    const [currentButtonColor, setCurrentButtonColor] = useState(buttonColor === 'primary' ? buttonColorPrimary : buttonColorSecondary);

    return (
        <NextModal
            backdrop={'blur'}
            isOpen={isOpen}
            onClose={onClose}
            className="bg-secondary rounded-md text-primary border border-primary !w-full transition-height duration-500 ease-in-out"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-primary bg-secondary rounded-md text-lg select-none">
                            {title}
                        </ModalHeader>
                        <ModalBody className="text-md text-secondary select-none">
                            {children}
                        </ModalBody>
                        {!buttonHide && (
                            <ModalFooter>
                                {isLoading ? (
                                    <Button
                                        color="danger"
                                        className={`${buttonColor === 'primary' ? 'bg-brand-disabled' : 'bg-red-primary'} text-gray-300 items-center cursor-not-allowed hover:bg-brand-disabled`}
                                    >
                                        <div className="mr-1 mt-1">
                                            <Spinner size="sm" color="secondary" />
                                        </div>
                                        {buttonText}
                                    </Button>
                                ) : (
                                    <Button
                                        color="secondary"
                                        onPress={async () => {
                                            setLoading(true);
                                            await onButtonPress();
                                            if (!isLoading) {
                                                onClose();
                                                setLoading(false);
                                            }
                                        }}
                                        className={currentButtonColor}
                                    >
                                        {buttonText}
                                    </Button>
                                )}
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </NextModal>
    );
});

Modal.displayName = 'Modal';
export { Modal };
