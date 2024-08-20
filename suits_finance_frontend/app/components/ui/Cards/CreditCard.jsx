import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
        <div className="flex justify-center items-center scale-[75%] xs:scale-75 sm:scale-80 md:scale-80 lg:scale-80 xl:scale-85 flex-col gap-y-1 select-none w-fit mx-auto">


            {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
                <>
                    <button className="m-8 bg-green-400 rounded-md p-2 text-primary" onClick={() => setCardNumberLoading(!loading.cardNumberLoading)}>Toggle card nr Loading</button>
                    <button className="m-8 bg-green-400 rounded-md p-2 text-primary" onClick={() => setExpiryDateLoading(!loading.expiryDateLoading)}>Toggle expirydate Loading</button>
                </>
            )}


            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">

                <div className="relative w-full h-full rounded-xl bg-brand-primary"></div>

                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light select-none">
                                Name
                            </p>
                            <p className="font-medium tracking-widest select-none">
                                {fullName ? (
                                    fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                ) : (
                                    <div className="w-[80px] h-[16px] ">
                                        <SkeletonLoader transparent={true} />
                                    </div>
                                )}
                            </p>
                        </div>
                        <Image className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="Card Logo" width={56} height={56} />
                    </div>
                    <div className="pt-1">
                        <p className="font-light select-none">
                            Card Number
                        </p>

                        <div className="font-medium tracking-widest select-none">
                            {loading.cardNumberLoading ? (
                                <div className="w-[220px] h-[24px]">
                                    <SkeletonLoader transparent={true} />
                                </div>
                            ) : (
                                formatCardNumber(cardNumber).replace(/(.{4})/g, '$1  ')
                            )}
                        </div>
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">

                            <div className="">
                                <p className="font-light text-xs select-none mb-1">
                                    Expiry
                                </p>
                                {loading.expiryDateLoading ? (
                                    <div className="w-[40px] h-[16px] ">
                                        <SkeletonLoader transparent={true} />
                                    </div>
                                ) : (
                                    <p className="font-medium tracking-wider text-sm select-none">
                                        03/25
                                    </p>
                                )}
                            </div>

                            <div className="">
                                <p className="font-light text-xs select-none">
                                    CVV
                                </p>
                                <p className="font-bold tracking-more-wider text-sm select-none">
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