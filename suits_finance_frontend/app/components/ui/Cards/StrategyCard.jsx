import React, { useState, Fragment, useEffect } from "react";

import StrategyCardAreaChart from "@/app/components/ui/Charts/StrategyCardAreaChart.jsx";

import { DocumentChartBarIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, EyeIcon } from "@heroicons/react/24/outline";

import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";
import formatBigNumber from "@/app/client/hooks/formatting/CalculateBigNumber";

import PropTypes from 'prop-types';

const StrategyCard = ({
    strategyName,
    setCurrentStrategy,
    strategyId,
    winrate,
    totalTrades,
    pnl,
    currency,
    equityPercentage
}) => {
    const arrowUpGreen = <ArrowUpCircleIcon className="h-6 w-6 text-green" />;
    const arrowDownRed = <ArrowDownCircleIcon className="h-6 w-6 text-red" />;

    return (
        <div className="h-fit  w-full max-w-[400px] pb-[15px] bg-secondary rounded-md border border-primary">
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-1 p-[25px] items-center">
                    < DocumentChartBarIcon className="icon" />
                    <p className="text-primary text-[22px] ml-1 select-none">
                        {strategyName}
                    </p>
                </div>

                <div className="flex flex-row gap-x-8 px-[15px] justify-between bg-primary rounded-md py-4 mx-auto w-[92%] border border-primary">

                    <div className="ml-1 flex flex-col gap-y-1">

                        <p className="text-secondary text-xs select-none">
                            Total trades
                        </p>
                        <div className="flex flex-row gap-x-1 items-center mx-auto">

                            {totalTrades > 0 ? (
                                <p className="text-primary select-none text-lg">
                                    {totalTrades}
                                </p>
                            ) : (
                                <div className={`w-[70px] overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
                                    <div className={`h-[27px] rounded-lg text-color bg-skeleton`}></div>
                                </div>
                            )}


                        </div>


                    </div>
                    <div className="ml-1 flex flex-col gap-y-1">

                        <p className="text-secondary text-xs select-none ">
                            Winrate %
                        </p>
                        {winrate > 0 ? (
                            <div className="flex flex-row gap-x-1 items-center mx-auto">
                                {arrowDownRed}
                                <p className="text-primary select-none text-lg">
                                    {winrate}%
                                </p>
                            </div>

                        ) : (
                            <div className={`w-[70px] overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
                                <div className={`h-[27px] rounded-lg text-color bg-skeleton`}></div>
                            </div>
                        )}



                    </div>
                    <div className="ml-1 flex flex-col gap-y-1">

                        <p className="text-secondary text-xs select-none">
                            Pnl <span className="ml-1 text-accent text-[12px] select-none"> {currency}
                            </span>
                        </p>

                        {pnl > 0 ? (
                            <div className="flex flex-row gap-x-1 items-center mx-auto">
                                {arrowUpGreen}
                                <p className="text-primary select-none text-lg">
                                    {formatBigNumber(pnl)}
                                </p>
                            </div>

                        ) : (
                            <div className={`w-[70px] overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
                                <div className={`h-[27px] rounded-lg text-color bg-skeleton`}></div>
                            </div>
                        )}

                    </div>
                </div>

                <div className="flex flex-col gap-x-8 justify-between bg-primary rounded-md py-4 mx-auto mt-2 w-[92%] border border-primary ">
                    <div className="flex flex-row gap-x-1 justify-between w-full px-[15px] ">
                        <p className="text-secondary text-xs font-normal select-none ">
                            Total equity
                        </p>


                        {equityPercentage > 0 ? (
                            <div className="flex flex-row items-center">
                                {arrowUpGreen}
                                <p className="text-primary text-sm select-none ml-[2px]">
                                    {equityPercentage}%
                                </p>
                            </div>

                        ) : (
                            <div className={`w-[70px] overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
                                <div className={`h-[27px] rounded-lg text-color bg-skeleton`}></div>
                            </div>
                        )}
                    </div>



                    <div className="h-[175px] !w-full  mb-[-15px]">
                        < StrategyCardAreaChart 
                            strategyId={strategyId}
                        />
                    </div>


                </div>

                <a
                    href={`/journal?strategy=${strategyId}`}
                    target="_self"
                    className="mt-4 text-md text-primary hover:transition rounded-md hover:bg-accent bg-transparent  flex mx-auto py-2 cursor-pointer w-[92%] ">
                    <div className="select-none w-fit mx-auto flex gap-x-2 flex-row">
                        View strategy < EyeIcon className="icon" />
                    </div>
                </a>



            </div>
        </div>
    );
}

export default StrategyCard;


StrategyCard.propTypes = {
    strategyName: PropTypes.string,
    setCurrentStrategy: PropTypes.func,
    winrate: PropTypes.number,
    totalTrades: PropTypes.number,
    pnl: PropTypes.number,
    currency: PropTypes.string,
    equityPercentage: PropTypes.number,
    strategyId: PropTypes.string

};