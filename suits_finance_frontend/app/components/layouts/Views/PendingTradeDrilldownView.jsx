import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';

import SwitchInBlock from '@/app/components/ui/Switches/SwitchInBlock';
import ButtonPrimary from '@/app/components/ui/Buttons/ButtonPrimary';
import TradingViewLink from '@/app/components/ui/Charts/TradingViewLink';
import TextArea from '@/app/components/ui/InputFields/TextArea';

//loaders
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';

// apis
import GenerateChart from '@/app/client/api/ChartGeneration';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// notifs
import { ChartGeneratingNotification, ChartGeneratedSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import { useOrganizationStore, useUserViewStore, useUserStore } from '@/app/stores/stores';

import PropTypes from 'prop-types';



const PendingTradeDrilldownView = ({
    hide,
    trade,
    handleOpenModal_manualTp,
    handleOpenModal_updateTradeStatus
}) => {
    const { view } = useUserViewStore();
    const { organization } = useOrganizationStore();
    const { user } = useUserStore();

    // chart generation
    const [chartBase64, setChartBase64] = useState(null);
    const [chartLoading, setChartLoading] = useState(true);
    const [generationNotifCalled, setGenerationNotifCalled] = useState(false);
    const [chartSuccessCalled, setChartSuccessCalled] = useState(false);


    const [tradeNote, setTradeNote] = useState(trade.note);



    useEffect(() => {
        // if the user is not an admin, return
        if (organization.isMember) { return; }
        // if the user is not in the drilldown view, return
        if (!view.isEditingModePendingTrades) { return; }

        // Scroll to the top of the page when the component mounts
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0); 
        }

        // if the trade is not an exotic trade, return
        if (!hide) {
            // if the trade is not an exotic trade, return
            if (!generationNotifCalled) {
                ChartGeneratingNotification();
                setGenerationNotifCalled(true);
            }
            
            // fetch the chart
            const fetchChart = async () => {
                try {
                    setChartLoading(true);
                    const chartBase64 = await GenerateChart(trade.trade_hash);
                    setChartBase64(chartBase64);
                    setChartLoading(false);

                    if (!chartSuccessCalled) {
                        ChartGeneratedSuccessNotification();
                        setChartSuccessCalled(true);
                    }

                } catch (error) { console.error('Error fetching chart:', error); }
            };
            fetchChart();
        }
    }, [view.isEditingModePendingTrades]);


    return (
        <Fragment>
            <div className="w-[200px]"></div>
            {!hide && (
                <div className="justify-between items-center mt-[25px] gap-2">

                    <div>
                        <TextArea
                            label="Trade notes by admin"
                            disabled={!organization.isAdmin}
                            supabaseKey='note'
                            tradeHash={trade.trade_hash}
                            hide_when_empty={true}
                        />
                    </div>

                    <div className="flex-col sm:flex-row flex items-center pb-4 gap-x-4 gap-y-4">

                        {organization.isAdmin && (
                            <Fragment>
                                <SwitchInBlock
                                    label="Toggle automatic alerts"
                                    subText="Enabled by default, this only affects the current trade"
                                    cacheKey="cachedTradeAlerts"
                                    supabaseKey={'alerting'}
                                    tradeHash={trade.trade_hash}
                                />

                                <div className="flex items-start gap-2 text-nowrap ">
                                    <ButtonPrimary
                                        label={'Call manual alert'}
                                        setValue={handleOpenModal_manualTp}
                                    />
                                </div>
                            </Fragment>
                        )}
                    </div>
                    <div className="flex-col sm:flex-row flex items-center pb-4 gap-x-4 gap-y-4 w-full">
                        {organization.isAdmin && (
                            <Fragment>
                                <SwitchInBlock
                                    label="Toggle trade status updating"
                                    subText="Enabled by default, this only affects the current trade"
                                    cacheKey="cachedTradeStatusUpdating"
                                    supabaseKey={'trade_status_updating'}
                                    tradeHash={trade.trade_hash}
                                />

                                <div className="flex items-start gap-2 text-nowrap ">
                                    <ButtonPrimary
                                        label={'Change status'}
                                        setValue={handleOpenModal_updateTradeStatus}
                                    />
                                </div>
                            </Fragment>
                        )}
                    </div>

                    {/* display chart image */}
                    {trade.awaiting_archive && (
                        <span className="bg-red-500/60 rounded-md p-2 flex items-center mx-auto w-fit">
                            <ExclamationTriangleIcon className="h-5 w-5 text-white mr-2" />
                            <p className="text-white text-[14px] select-none">
                                This trade is awaiting archiving!
                            </p>
                        </span>
                    )}
                    {/* && organization.isAdmin */}
                    {!trade.awaiting_archive && (
                        <>
                            <div className="flex items-center flex-row justify-center w-fit mb-[10px] mx-auto gap-x-2 border-2 border-yellow-300 rounded-md p-2">
                                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                                <p className="text-yellow-400 select-none">
                                    Charts are extremely experimental!
                                </p>



                            </div>

                            <div className="w-full mx-auto">
                                <TradingViewLink symbol={trade.pairname} timeframe={trade.timeframe} />
                            </div>


                            <div className="border border-primary bg-input-primary rounded-md mt-[25px] select-none">
                                {chartBase64 ? (
                                    <Image
                                        src={`data:image/png;base64,${chartBase64}`}
                                        alt="chart"
                                        width={532}
                                        height={300}
                                        className="h-[300px] max-w-[380px] sm:max-w-[532px] object-cover rounded-md select-none"
                                    />
                                ) : chartLoading && (
                                    <div className="h-[300px] max-w-[380px] sm:max-w-[532px] ">
                                        <SkeletonLoader
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            )}
        </Fragment>
    )
}

export default PendingTradeDrilldownView;


PendingTradeDrilldownView.propTypes = {
    hide: PropTypes.bool,
    trade: PropTypes.object,
    handleOpenModal_manualTp: PropTypes.func,
    handleOpenModal_updateTradeStatus: PropTypes.func
};