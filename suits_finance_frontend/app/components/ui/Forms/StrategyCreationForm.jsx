import React, { useState, useEffect } from "react";

import { isWordBanned } from '@/app/client/hooks/profanityWords.js';
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";
import { Spinner } from "@nextui-org/react";
import {
    CurrencyDollarIcon,
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    CurrencyYenIcon
} from "@heroicons/react/24/outline";
import {
    Tabs,
    Tab
} from "@nextui-org/react";

import {
    CreateNewStrategyById,
    AddCurrencyById
} from "@/app/client/supabase/SupabaseUserData.js";

// internal api
import CreateStrategyId from "@/app/client/api/StrategyApi.js";

const StrategyCreationForm = (
    { setNotification, handleCreateStrategyForm }
) => {
    const { userId } = useRequireAuth();
    const [strategyName, setStrategyName] = useState(null);
    const [currency, setCurrency] = useState("usd");
    const [isLoading, setIsLoading] = useState(false);
    const [strategyHash, setStrategyHash] = useState(null);

    const handleStrategyCreation = (e) => {

        e.preventDefault();
        if (strategyName === null) {
            setNotification("BlankStrategyName");
            setTimeout(() => {
                setNotification(null);
            }, 5500);
            return;
        }

        if (strategyName !== null) {
            if (isWordBanned(strategyName)) {
                setNotification("InvalidStrategyName");
                setTimeout(() => {
                    setNotification(null);
                }, 5500);

                return;
            }
        }

        if (strategyName.length > 100) {
            setNotification("StrategyNameTooLong");
            setTimeout(() => {
                setNotification(null);
            }, 5500);
            return;
        }

        const isValidName = /^[a-zA-Z0-9_!]+$/.test(strategyName);

        if (!isValidName) {
            setNotification("InvalidCharactersInStrategyName");
            setTimeout(() => {
                setNotification(null);
            }, 5500);
            return;

        } else {
            if (strategyName !== null || strategyName !== "") {
                setIsLoading(true);
                CreateStrategyId(strategyName, userId).then((data) => {
                    setStrategyHash(data);
                    if (data) {
                        setIsLoading(false);
                    }
                });
            }
        }
    }

    useEffect(() => {
        if (strategyHash !== null) {
            CreateNewStrategyById(strategyName, userId, strategyHash);
            AddCurrencyById(currency, userId);
            handleCreateStrategyForm();
        }
    }, [strategyHash]);


    return (
        <div>
            <form className="flex flex-col">
                <h2 className="font-semibold leading-6 text-primary text-xl">
                    Strategy creation
                </h2>

                <p className="mt-1 text-sm text-secondary font-normal w-[300px] sm:w-[450px] mx-auto">
                    You can change all of this later, so don't worry about getting it perfect now.
                </p>

                <div className="mt-8">
                    <label
                        htmlFor="strategyName"
                        className="block text-sm font-medium text-secondary"
                    >
                        Strategy name
                    </label>
                    <div className="mt-1">
                        <input
                            id="strategyName"
                            name="strategyName"
                            type="strategyName"
                            autoComplete="strategyName"
                            placeholder=""
                            required
                            onChange={(e) => setStrategyName(e.target.value)}
                            value={strategyName}
                            className="block mx-auto appearance-none rounded-md bg-input-primary px-3 py-2  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm font-medium text-secondary border border-primary"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mx-auto mt-8 flex-col">
                    <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-secondary"
                    >
                        Preferred currency
                    </label>
                    {/* TABS */}
               
                    <Tabs
                        key="lg"
                        radius="md"
                        aria-label="Tabs radius"
                        selectedKey={currency}
                        onSelectionChange={setCurrency}
                    >
                        <Tab key="usd" title={<><CurrencyDollarIcon className="inline-block w-5 h-5 mr-1" />Dollar</>} />
                        <Tab key="eur" title={<><CurrencyEuroIcon className="inline-block  w-5 h-5  mr-1" />Euro</>} />
                        <Tab key="gbp" title={<><CurrencyPoundIcon className="inline-block w-5 h-5  mr-1" />Pound</>} />
                        <Tab key="yen" title={<><CurrencyYenIcon className="inline-block  w-5 h-5  mr-1" />Yen</>} />
                    </Tabs>
                </div>

                <div className="mt-8 flex flex-row"></div>

                {!isLoading && (
                    <button
                        type="submit"
                        className="flex mx-auto justify-center rounded-md bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                        onClick={handleStrategyCreation}
                    >
                        Create
                    </button>
                )}

                {isLoading && (
                    <button
                        type="submit"
                        className="flex mx-auto justify-center rounded-md bg-brand-disabled py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition cursor-default"
                    >
                        <Spinner size="sm" className="-ml-1 pr-2" />
                        Create
                    </button>
                )}

            </form>
        </div>
    )
}

export default StrategyCreationForm