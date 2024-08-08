import React, { useState, useEffect } from "react";
import {
    Tabs,
    Tab
} from "@nextui-org/react";
import {
    GetCurrencyById,
    UpdateCurrencyById
} from "@/app/client/supabase/SupabaseUserData.js";
import {
    CurrencyDollarIcon,
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    CurrencyYenIcon
} from "@heroicons/react/24/outline";
import {
    UpdateDescriptionByStrategyHash,
    GetDescriptionByStrategyHash,
    SaveAccountSizeById,
    GetAccountSizeById,
    SaveRiskPerTradeById,
    GetRiskPerTradeById
} from "@/app/client/supabase/SupabaseUserData.js";
import {
    SetKeyLocalStorage,
    GetKeyLocalStorage
} from "@/app/client/caching/LocalStorageRouter";

import StrategyDeletionConfirmation from "@/app/components/ui/Modals/StrategyDeletionConfirmation.jsx";
import InputField from "@/app/components/ui/InputFields/InputField.jsx";
import TextArea from "@/app/components/ui/InputFields/TextArea.jsx";
import convertCurrencyToSymbol from "@/app/client/hooks/formatting/CurrencySymbol.js";


const SettingsPage = (
    { setNotification, userId }
) => {
    const [currency, setCurrency] = useState("usd"); // make this fetch what the user has in the db
    const [isLoading, setIsLoading] = useState(false);
    const [accountSize, setAccountSize] = useState(0);
    const [riskPerTrade, setRiskPerTrade] = useState(0);
    const [description, setDescription] = useState(null);
    const riskPerTradeCurrency = accountSize * (riskPerTrade / 100);
    const strategyHash = GetKeyLocalStorage("strategyHash");
    const currencySymbol = convertCurrencyToSymbol(currency);

    const [showTradeDeletionModal, setShowTradeDeletionModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const description = await GetDescriptionByStrategyHash(strategyHash, userId);
            setDescription(description);
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        const updateData = async (data, updateFunction) => {
            await updateFunction(data, userId);
        };

        const timeoutId = setTimeout(() => {
            if (description) UpdateDescriptionByStrategyHash(strategyHash, userId, description);
            if (description) updateData(description, UpdateDescriptionByStrategyHash);
            if (accountSize) updateData(accountSize, SaveAccountSizeById);
            if (riskPerTrade) updateData(riskPerTrade, SaveRiskPerTradeById);
        }, 1000); // Wait for 1 second before calling update functions

        return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or if the effect is called again

    }, [description, accountSize, riskPerTrade, userId]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [currencyResult, accountSizeResult, riskPerTradeResult] = await Promise.all([
                    GetCurrencyById(userId),
                    GetAccountSizeById(userId),
                    GetRiskPerTradeById(userId)
                ]);

                setCurrency(currencyResult);
                setAccountSize(accountSizeResult);
                setRiskPerTrade(riskPerTradeResult);
                SetKeyLocalStorage("currency", currencyResult);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [userId]);


    const handleTradeDeletion = (setSelectedTradeHash) => {
        deleteTradeHashFromLocalStorage();
        SetKeyLocalStorage("tradeHash", setSelectedTradeHash);
        setShowTradeDeletionModal(true);
    };

    const handleCurrencyChange = async (currency) => {
        setIsLoading(true);
        await UpdateCurrencyById(currency, userId);
        setCurrency(currency);
        SetKeyLocalStorage("currency", currency);
        setIsLoading(false);
    }

    return (
        <div className="h-[1200px]">

            < StrategyDeletionConfirmation
                showTradeDeletionModal={showTradeDeletionModal}
                setShowTradeDeletionModal={setShowTradeDeletionModal}
                userId={userId}
            />

            <div className="rounded-md h-[300px] w-full">

                <div className="flex flex-row border-b border-primary">
                    <h1 className="text-xl font-semibold text-primary p-4 ">
                        Strategy settings
                    </h1>
                </div>

                <div className="flex flex-wrap gap-2 mx-auto mt-4 pl-4 sm:pl-4 flex-col">
                    <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-accent"
                    >
                        Preferred currency
                    </label>

                    <Tabs
                        key="lg"
                        radius="md"
                        aria-label="Tabs radius"
                        selectedKey={currency}
                        onSelectionChange={handleCurrencyChange}
                    >
                        <Tab key="usd" title={<><CurrencyDollarIcon className="inline-block w-5 h-5 mr-1" />Dollar</>} />
                        <Tab key="eur" title={<><CurrencyEuroIcon className="inline-block  w-5 h-5  mr-1" />Euro</>} />
                        <Tab key="gbp" title={<><CurrencyPoundIcon className="inline-block w-5 h-5  mr-1" />Pound</>} />
                        <Tab key="yen" title={<><CurrencyYenIcon className="inline-block  w-5 h-5  mr-1" />Yen</>} />
                    </Tabs>

                    < TextArea label={"Strategy description"} value={description} setValue={setDescription} />

                </div>
            </div>

            <div className=" rounded-md h-[400px] w-full mt-5">

                <div className="flex flex-row border-b border-primary">
                    <h1 className="text-xl font-semibold text-primary p-4 ">
                        Account settings
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:flex-row sm:flex pr-2">

                    <InputField
                        label={`Account size ${currencySymbol}`}
                        setValue={(e) => setAccountSize(e.target.value)}
                        value={accountSize}
                    />
                    <InputField
                        label={"Risk per trade %"}
                        setValue={(e) => setRiskPerTrade(e.target.value)}
                        value={riskPerTrade}
                    />
                    <InputField
                        label={`Estimated position size ${currencySymbol}`}
                        value={riskPerTradeCurrency}
                        disabled={true}
                        tooltip={true}
                        tooltipContent={"This is the estimated position size per trade based on your account size and risk per trade."}
                    />

                </div>
            </div>

            <div className="rounded-md h-[165px] w-full mt-5">
                <div className="flex flex-row border-b border-primary">
                    <h1 className="text-xl font-semibold text-primary p-4">
                        Danger zone
                    </h1>
                </div>

                <div className="flex flex-wrap gap-2 mx-auto mt-4 pl-4 sm:pl-4 pr-4 flex-col">
                    <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-accent"
                    >
                        Delete strategy
                    </label>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition sm:w-[167px] pr-4"
                        onClick={() => handleTradeDeletion(strategyHash)}
                    >
                        Delete strategy
                    </button>

                </div>
            </div>
        </div>
    );
}

export default SettingsPage;