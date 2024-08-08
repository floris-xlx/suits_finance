import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@nextui-org/react';
import StrategyCard from '@/app/components/ui/Cards/StrategyCard';
import client from "@/app/client/graphql/ApolloClient.jsx";
import { GET_STRATEGIES } from "@/app/client/graphql/query";

// layouts
import CreateStrategy from '@/app/components/layouts/Forms/CreateStrategy';



import { useUserStore, useLayoutStore, useUserViewStore, useStrategyStore, useLoadingStore } from '@/app/stores/stores';
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";


const StrategyCardsGrid = () => {
    const { strategies } = useStrategyStore();
    const { user } = useUserStore();
    const { view, setIsInStrategyCreationFlow } = useUserViewStore();


    const handleCreateStrategy = () => {
        setIsInStrategyCreationFlow(true);
        console.log('create strategy');

    };
    
    // // data fetching logic for strategies
    const { data } = useQuery(GET_STRATEGIES, {
        variables: {
            organization: user.organization
        },
        client: client
    });

    const queryResult = data?.strategiesCollection?.edges;




    return (
        <div className="h-full w-full max-w-[1415px] mx-auto px-[15px] sm:px-[80px]  ">
            <div className="flex flex-row gap-x-1 items-center w-full h-full mx-auto md:justify-end">
                {!view.isInStrategyCreationFlow && (
                    <Button
                        color="warning"
                        className="mt-6 mb-1 mr-4"
                        onPress={handleCreateStrategy}
                    >
                        <span className="text-white transition">
                            Create Strategy
                        </span>
                    </Button>
                )}
            </div>

            <div className="relative h-full w-full">
                <div
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${view.isInStrategyCreationFlow ? 'slide-out-element mt-[70px]' : ''}`}
                >
                    <div className="grid grid-cols-1 xlx-md:grid-cols-2 xl:grid-cols-3 gap-8 pt-[25px] pb-[100px]">
                        {queryResult?.map(({ node }, index) => (

                            <StrategyCard
                                key={node.strategy_id}
                                strategyName={node.name}
                                setCurrentStrategy={() => { }}
                                strategyId={node.strategy_id}
                                winrate={node.winrate}
                                totalTrades={node.total_trades}
                                pnl={node.pnl}
                                currency={node.currency}
                                equityPercentage={node.equity_percentage}
                            />

                        ))}
                    </div>
                </div>

                {view.isInStrategyCreationFlow && (
                    <div className="absolute top-0 left-0 w-full h-[74vh] transition-opacity duration-500 opacity-100 ">
                        <CreateStrategy

                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategyCardsGrid;