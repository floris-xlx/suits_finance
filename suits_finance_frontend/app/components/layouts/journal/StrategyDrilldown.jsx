import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { useUserViewStore, useUserStore } from '@/app/stores/stores';

// ui
import EquityCurveChart from '@/app/components/ui/Charts/EquityCurveChart';
import SideBar from '@/app/components/ui/SideBars/SideBar';
import TradeLogTable from '@/app/components/ui/Tables/TradeLogTable';



import PropTypes from 'prop-types';





export default function StrategyDrilldown({
    strategy = { name: 'Strategy Name' }
}) {
    const { view, setIsInStrategyDrilldown, setIsInJournalStrategiesOverview } = useUserViewStore();
    const { user } = useUserStore();

        // if view.strategyDrilldownSideBarItem is null then set it to {title: "General"}
    if (!view.strategyDrilldownSideBarItem) {
        view.strategyDrilldownSideBarItem = { title: "General" };
    }


    // clear query params
    const removeQueryParams = () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        setIsInStrategyDrilldown(false);
        setIsInJournalStrategiesOverview(true);
    }

    return (
        <div className="w-full pb-[120px]">
            <div className="flex flex-row items-center justify-between w-full">
                <button onClick={() => { removeQueryParams() }}

                    className="cursor-pointer  hover:transition hover:text-secondary bg-transparent hover:bg-accent rounded-md p-3 flex flex-row gap-x-1 items-center" >
                    <ArrowLeftIcon className="h-8 w-8 text-primary " />
                    <span className="text-primary select-none text-md ml-1">
                        Go back
                    </span>
                </button>
            </div>

            <div className="flex flex-row gap-x-1 w-full mt-8">

                <div className="sm:flex flex-col gap-y-1 sm:min-w-[140px] hidden">
                    <SideBar />
                </div>
                <div className="w-full">
                    {view.strategyDrilldownSideBarItem?.title === 'General' && (
                        <EquityCurveChart userId={user.id} strategyId={strategy.strategy_id} />
                    )}

                    {view.strategyDrilldownSideBarItem.title === 'Trades' && (
                        <div className="px-2">
                            <TradeLogTable userId={user.id} strategyId={strategy.strategy_id} />
                        </div>
                    )}


                </div>

            </div>

        </div>
    );
}



StrategyDrilldown.propTypes = {
    strategy: PropTypes.object.isRequired
};