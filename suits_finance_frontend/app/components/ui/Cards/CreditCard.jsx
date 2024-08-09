import React, { useState, useEffect } from 'react';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';

import { useLoadingStore } from '@/app/stores/stores';

const CreditCard = ({
    fullName = "First Last",
    cardNumber = "4642348998677632",
}) => {
    const { loading, setCardNumberLoading, setExpiryDateLoading } = useLoadingStore();


    const formatCardNumber = (cardNumber) => {
        const cardNumberArray = cardNumber.split('');
        const formattedCardNumber = cardNumberArray.map((digit, index) => {
            if (index < cardNumberArray.length - 4) {
                return '•';
            } else {
                return digit;
            }
        });
        return formattedCardNumber.join('');
    }

    const lastFourDigits = cardNumber.slice(-4);






    return (
        <div class="flex justify-center items-center scale-[75%] xs:scale-75 sm:scale-80 md:scale-80 lg:scale-80 xl:scale-85 flex-col gap-y-1 select-none w-fit mx-auto">


            {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
                <>
                    <button className="m-8 bg-green-400 rounded-md p-2 text-primary" onClick={() => setCardNumberLoading(!loading.cardNumberLoading)}>Toggle card nr Loading</button>
                    <button className="m-8 bg-green-400 rounded-md p-2 text-primary" onClick={() => setExpiryDateLoading(!loading.expiryDateLoading)}>Toggle expirydate Loading</button>
                </>
            )}


            <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">

                <div class="relative w-full h-full rounded-xl bg-brand-primary"></div>

                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light select-none">
                                Name
                            </p>
                            <p class="font-medium tracking-widest select-none">
                                {fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </p>
                        </div>
                        <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                    </div>
                    <div class="pt-1">
                        <p class="font-light select-none">
                            Card Number
                        </p>

                        <div class="font-medium tracking-widest select-none">
                            {loading.cardNumberLoading ? (
                                <div className="w-[220px] h-[24px]">
                                    <SkeletonLoader transparent={true} />
                                </div>
                            ) : (
                                formatCardNumber(cardNumber).replace(/(.{4})/g, '$1  ')
                            )}
                        </div>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">

                            <div class="">
                                <p class="font-light text-xs select-none mb-1">
                                    Expiry
                                </p>
                                {loading.expiryDateLoading ? (
                                    <div className="w-[40px] h-[16px] ">
                                        <SkeletonLoader transparent={true} />
                                    </div>
                                ) : (
                                    <p class="font-medium tracking-wider text-sm select-none">
                                        03/25
                                    </p>
                                )}
                            </div>

                            <div class="">
                                <p class="font-light text-xs select-none">
                                    CVV
                                </p>
                                <p class="font-bold tracking-more-wider text-sm select-none">
                                    ···
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex space-x-4 mt-8">
                {loading.cardNumberLoading ? (
                    <div className="w-[220px] h-[28px]">

                        <SkeletonLoader />
                    </div>
                ) : (
                    <>
                        <div className="text-primary text-lg select-none">
                            ••••
                        </div>
                        <div className="text-primary text-lg select-none">
                            ••••
                        </div>
                        <div className="text-primary text-lg select-none">
                            ••••
                        </div>
                        <div className="text-primary text-lg select-none">
                            {lastFourDigits}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CreditCard;