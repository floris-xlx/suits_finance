import OrganizationTab from '@/app/components/ui/Tabs/OrganizationTab';
// modal
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

// next button
import { Button, Spinner } from '@nextui-org/react';


const ChangeOrganizationModal = ({
  isLoadingInvalidate,
  handleButtonOrganization,
  modalButtonText,
  isOpen,
  onClose,
  modalTitle,
}) => { 
  return (
    <>
      <Modal
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={onClose}
        className="bg-secondary rounded-md text-primary border border-primary !w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary bg-secondary rounded-md text-lg select-none">
                {modalTitle}
              </ModalHeader>

              <ModalBody className="text-md text-secondary select-none">
                <OrganizationTab
                  organizationNames={[
                    'Xylex',
                    'Diamant Capital',
                    'Trades By Rob',
                  ]}
                />

                <p></p>
              </ModalBody>
              <ModalFooter>
                {isLoadingInvalidate ? (
                  <Button
                    color="danger"
                    className="bg-brand-primary transition text-gray-300 items-center cursor-not-allowed"
                  >
                    <div className="mr-1 mt-1">
                      <Spinner size="sm" color="secondary" />
                    </div>

                    {modalButtonText}
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    onPress={handleButtonOrganization}
                    className="bg-brand-primary hover:bg-brand-secondary transition text-white"
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

export default ChangeOrganizationModal;
