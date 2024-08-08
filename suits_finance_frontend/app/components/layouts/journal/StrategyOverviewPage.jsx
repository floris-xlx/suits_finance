import React, { useState, useEffect } from "react";
import SearchBarStrategies from "@/app/components/ui/AutoComplete/SearchBarStrategies.jsx";
import { PlusIcon } from '@heroicons/react/20/solid'

import StrategyCard from "@/app/components/ui/Cards/StrategyCard.jsx";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";
import { GetAllStrategyNamesById } from "@/app/client/supabase/SupabaseUserData.js";


const StrategyOverviewPage = ({
    handleCreateStrategyAlreadyHasStrategies,
    setCurrentStrategy
 }) => {
    const { userId } = useRequireAuth();
    const [strategyNames, setStrategyNames] = useState([]);
    const [selectedStrategy, setSelectedStrategy] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const strategyNames = await GetAllStrategyNamesById(userId); // RENAME THIS AS IT FETCHES ALL ATTRIBUTES
                    setStrategyNames(strategyNames);
                    setIsDataLoading(false);
                } catch (error) {
                    console.log("error", error);
                }
            }
            fetchData();
        }
    }, [userId]);



    return (
        <div className="mt-8">
            <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <div className="h-[44px] flex flex-row justify-between items-center">

                        <div>
                            < SearchBarStrategies setSelectedStrategy={setSelectedStrategy}/>

                        </div>

                        <div>  

                            {/* replace this with a component that has a an icon and a button with an argument that accepts on Click */}
                            <button  
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 h-[43px] text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                                onClick={handleCreateStrategyAlreadyHasStrategies}
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                Create Strategy
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-wrap -mx-4">
                        {strategyNames
                          .sort((a, b) => a.name === selectedStrategy ? -1 : b.name === selectedStrategy ? 1 : 0)
                          .map((strategy, index) => (
                            <div key={index} className="text-primary mt-6 font-semibold text-xl w-full sm:w-1/2 md:w-1/2  lg:w-1/3 px-4">
                                <StrategyCard
                                    strategyName={strategy.name}
                                    setCurrentStrategy={setCurrentStrategy}
                                    strategyHash={strategy.strategy_hash}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StrategyOverviewPage;