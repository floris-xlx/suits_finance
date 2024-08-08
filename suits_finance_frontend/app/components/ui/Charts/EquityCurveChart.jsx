import React, { useEffect, useState, Fragment } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

import formatBigNumber from '@/app/client/hooks/formatting/CalculateBigNumber.js';
import convertCurrencyToSymbol from '@/app/client/hooks/formatting/CurrencySymbol.js';
import { formatDate } from '@/app/client/hooks/datetime/RelativeDate.js';
import TabHorizontal from '@/app/components/ui/Tabs/TabHorizontalWithValue';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader.jsx';
import { StrategyPnlChartApi } from '@/app/client/api/v2/StrategyPnlChart.js';
import { GetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import NoDataFound from '@/app/components/ui/EmptyStates/NoDataFound.jsx';
import ValueWithLabel from '@/app/components/ui/Statistics/ValueWithLabel.jsx';

import { ToolTipText } from "@/app/components/ui/ToolTip/ToolTip.jsx";

import { useUserViewStore } from '@/app/stores/stores';



import PropTypes from 'prop-types';


const EquityCurveChart = ({ userId, strategyId }) => {
    const [currency, setCurrency] = useState("eur");
    const Price = "22,641.38";

    const { view, setJournalEquityChartDateLength } = useUserViewStore();


    const [chartLoading, setChartLoading] = useState(false);
    const [trades, setTrades] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        setChartLoading(true);
        StrategyPnlChartApi(strategyId, view.journalEquityChartDateLength)
            .then((response) => {
                setChartLoading(false);

                if (Array.isArray(response.data.trades) && response.data.trades.length === 0) {
                    setJournalEquityChartDateLength("12_months");
                }


                setTrades(response.data.trades);
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
                setChartLoading(false);
            });
    }, [userId, view.journalEquityChartDateLength]);


    // if total_trades is <2, show no data found

    const totalCummulativeRr = data?.trades?.slice(-1)[0]?.cumulative_rr ?? null;
    const totalEquityOfRr = (data && data.total_trades < 2) ? 0 : totalCummulativeRr * 99.35;


    return (
        <div className=" rounded-md  ml-2 w-full sm:mr-3">

            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-primary text-lg px-2 font-semibold select-none">
                        Equity curve <span className="text-secondary text-xs  ml-2 rounded-md bg-secondary p-2">*Assuming 100{convertCurrencyToSymbol(currency)} risk</span>
                        
                    </p>
                    
                    <div aria-controls='Equity curve' className="text-primary text-3xl font-semibold p-2 select-none">
                        {convertCurrencyToSymbol(currency)}{totalEquityOfRr.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                </div>



                <div className="w-fit">
                    <TabHorizontal
                        options={[
                            "12 months",
                            "30 days",
                            "7 days",
                            "24 hours",
                        ]}
                        cacheValueKey={"cachedEquityCurveDateLength"}
                        setValueExternal={setJournalEquityChartDateLength}
                    />
                </div>

            </div>


            <div className="w-full h-[400px] flex flex-col">
                {chartLoading ? (
                    <div className="w-full h-[450px] mt-2">
                        <div className={`w-full overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
                            <div className={`h-[380px] rounded-lg text-color bg-skeleton`}></div>
                        </div>
                    </div>
                ) : (
                    renderChartContent(data, trades, totalCummulativeRr)
                )}
            </div>
        </div>
    );
};

const renderChartContent = (data, trades, totalCummulativeRr) => {
    if (data && data.total_trades < 2) {
        return (
            <div className="mt-[160px]">
                <NoDataFound />
            </div>
        );
    } else {
        return (
            <div className="flex flex-row gap-x-1 w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={trades}
                        margin={{
                            top: 45,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <Tooltip
                            labelFormatter={(index) => `${formatDate(trades[index].created_at)}`}
                            formatter={(value, name) => [`${formatBigNumber(value.toFixed(2))}`, "RR"]}
                            contentStyle={{
                                borderRadius: '8px',
                                border: `1px solid var(--color-border-primary)`,
                                backgroundColor: `var(--color-secondary)`,
                                color: `var(--color-text-primary)`,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="cumulative_rr"
                            stroke="var(--color-brand-primary)"
                            fillOpacity={(dataMin, dataMax, cumulative_rr) => {
                                const range = dataMax - dataMin;
                                const normalizedValue = (cumulative_rr - dataMin) / range;
                                return 0.2 + (0.8 * normalizedValue); // gradually fades from 0.2 to 1.0 opacity
                            }}
                            fill="url(#colorBalance)"
                            strokeWidth="3px"
                            strokeOpacity="0.8"
                        />
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="var(--color-brand-disabled)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-y-8 items-center mx-auto  w-[200px] h-fit ">
                    <ValueWithLabel value={data.winrate} label="Total winrate%" valueSuffix="%" />
                    <ValueWithLabel value={data.total_trades} label="Total trades" showDecimal={false} />
                    <ValueWithLabel value={totalCummulativeRr} label="Total RR" valueSuffix='rr' />
                </div>
            </div>
        );
    }
};

export default EquityCurveChart;

EquityCurveChart.propTypes = {
    userId: PropTypes.string,
    strategyId: PropTypes.string,
};