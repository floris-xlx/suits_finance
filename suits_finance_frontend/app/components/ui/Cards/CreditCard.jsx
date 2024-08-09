import React, { useState, useEffect } from 'react';

const CreditCard = ({
    fullName = "First Last", 
    cardNumber = "4642348998677632",
}) => {
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


    return (
        <div class=" flex justify-center items-center scale-80 flex-col gap-y-1">

            <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">

                <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"></img>

                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light">
                                Name
                            </p>
                            <p class="font-medium tracking-widest">
                                {fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </p>
                        </div>
                        <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                    </div>
                    <div class="pt-1">
                        <p class="font-light">
                            Card Number
                        </p>

                        <p class="font-medium tracking-more-wider">
                            {formatCardNumber(cardNumber).replace(/(.{4})/g, '$1 ')}
                        </p>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <div class="">
                                <p class="font-light text-xs">
                                    Valid
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    11/15
                                </p>
                            </div>
                            <div class="">
                                <p class="font-light text-xs ">
                                    Expiry
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    03/25
                                </p>
                            </div>

                            <div class="">
                                <p class="font-light text-xs">
                                    CVV
                                </p>
                                <p class="font-bold tracking-more-wider text-sm">
                                    ···
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex space-x-4 mt-8">
                <div className="text-primary text-lg">
                    ••••
                </div>
                <div className="text-primary text-lg">
                    ••••
                </div>
                <div className="text-primary text-lg">
                    ••••
                </div>
                <div className="text-primary text-lg">
                    7632
                </div>
            </div>
        </div>
    );
}

export default CreditCard;