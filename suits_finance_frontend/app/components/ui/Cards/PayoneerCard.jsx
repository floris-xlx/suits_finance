import React, { useState, useEffect, Fragment } from 'react';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import { PayoneerIcon } from '../Icon';
import { getUserCards, addPayoneerCard } from '@/app/client/supabase/SupabaseUserData';
import { useUserStore } from '@/app/stores/stores';
import { TrashIcon } from '@heroicons/react/24/outline';
import ButtonIcon from '@/app/components/ui/Buttons/ButtonIcon';
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import InputField from '@/app/components/ui/InputFields/InputField';


const PayoneerCard = () => {
    const { user } = useUserStore();
    const [cards, setCards] = useState([]);
    const [cardsLoading, setCardsLoading] = useState(true);

    const { modalRef: modalRef_deletePayoneer, handleOpenModal: handleOpenModal_deletePayoneer } = useModal();
    
    const { modalRef: modalRef_deletePayoneerConfirm, handleOpenModal: handleOpenModal_deletePayoneerConfirm } = useModal();

    const [cardInFocus, setCardInFocus] = useState(null);




    useEffect(() => {
        const fetchCards = async () => {
            if (user) {
                const cards = await getUserCards(user.id);
                setCards(cards);
                setCardsLoading(false);
            }

            setCardsLoading(false);
        };
        fetchCards();
    }, [user]);

    const handleDeletePayoneer = async ({card}) => {
        console.log('delete payoneer');
        setCardInFocus(card);

        handleOpenModal_deletePayoneer();
    }


    const handleDeletePayoneerConfirm = async ({card}) => {
        setCardInFocus(card);

        console.log('delete payoneer confirmed');
        handleOpenModal_deletePayoneerConfirm();

        
    }




    return (
        <Fragment>
            <Modal 
                ref={modalRef_deletePayoneer} 
                title="Delete Payoneer Card" 
                buttonText={'Delete'} 
                onButtonPress={handleDeletePayoneerConfirm}>

                <p>Are you sure you want to delete this Payoneer card?</p>
            </Modal>


            <Modal
                ref={modalRef_deletePayoneerConfirm}
                title="Delete Payoneer Card"
                buttonText={'Delete'}
                onButtonPress={handleDeletePayoneerConfirm}>
                <p>Are you sure you want to delete this Payoneer card?</p>
            </Modal>

            {cardsLoading ? (
                <div className="h-[84px] w-full">
                    <SkeletonLoader />
                </div>
            ) : (
                cards.map((card, index) => (
                    <div key={index} className="border-primary border bg-secondary rounded-md w-full p-4 flex flex-row gap-x-1 items-center">
                        <div className="bg-accent border border-primary p-2 rounded-md">
                            <PayoneerIcon className="w-12 h-12" />
                        </div>
                        <div className="flex flex-col gap-y-1 ml-4 rounded-md bg-accent p-2 w-fit">
                            <p className="text-primary text-xs">{card.card_holder_name}</p>
                            <p className="text-primary text-xs font-normal flex justify-center w-full">**** **** **** {card.last_4}</p>
                            <p className="text-secondary text-xs ">Provider: {card.provider}</p>
                        </div>
                        <div className="flex flex-row gap-x-1 ml-auto mr-3">
                            <ButtonIcon>
                                <TrashIcon className="w-6 h-6 text-red" />
                            </ButtonIcon>
                        </div>
                    </div>
                ))
            )}
        </Fragment>
    );
}

export default PayoneerCard;