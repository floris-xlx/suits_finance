
// modal
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

// next button
import { Button, Spinner } from '@nextui-org/react';

const InvalidateTradeConfirmation = ({
  isLoadingInvalidate,
  handleButtonOrganization,
  modalButtonText,
  isOpen,
  onClose,
  modalTitle,
  trade,
}) => {
  const backdrop = 'blur';
  return (
    <>
      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        // size={modalSize}
        className="bg-secondary rounded-md text-primary border border-primary !w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary bg-secondary rounded-md text-lg select-none">
                {modalTitle}
              </ModalHeader>

              <ModalBody className="text-md text-secondary select-none">
                <p>Are you sure you want to invalidate this trade?</p>

                <p>
                  Invalidation is irreversible and will remove this trade from
                  the list of pending trades, accompanied by a notification to
                  the channel members.
                </p>

                <p className="text-yellow-500 bg-yellow-100 rounded-md p-3 border-yellow-400 border-2 font-bold">
                  Trade messages for invalidation are not yet implemented !!!
                  <br></br>It WILL update the status however!!
                </p>

                <p className="rounded-md bg-input-primary text-accent p-1 text-center text-[14px] cursor-default mt-2 select-none">
                  {trade.trade_hash}
                </p>
              </ModalBody>
              <ModalFooter>
                {isLoadingInvalidate ? (
                  <Button
                    color="danger"
                    className="bg-red-primary transition text-gray-300 items-center cursor-not-allowed"
                  >
                    <div className="mr-1 mt-1">
                      <Spinner size="sm" color="secondary" />
                    </div>

                    {modalButtonText}
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    onPress={() => { onClose(); handleButtonOrganization(); }}
                    className="bg-red-primary hover:bg-red-secondary transition text-white"
                  >
                    {modalButtonText}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvalidateTradeConfirmation;
