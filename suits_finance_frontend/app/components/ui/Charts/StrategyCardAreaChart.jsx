import React, { Fragment, useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { StrategyPnlChartApi } from '@/app/client/api/v2/StrategyPnlChart.js';


import PropTypes from 'prop-types';

const StrategyCardAreChart = ({
  userId,
  strategyId,
}) => {
  const [chartLoading, setChartLoading] = useState(false);
  const [trades, setTrades] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setChartLoading(true);
    StrategyPnlChartApi(strategyId, "12_months")
      .then((response) => {
        setChartLoading(false);
        setTrades(response.data.trades);
        setData(response.data);
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setChartLoading(false);
      });
  }, [userId]);

  return (
    <Fragment>
      {chartLoading ? (
        <div className="w-full h-[160px] mt-2">
          <div className={`w-full overflow-hidden relative rounded-md bg-skeleton before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent`}>
            <div className={`h-[160px] rounded-lg text-color bg-skeleton`}></div>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={200}
            height={60}
            data={trades}
            margin={{
              top: 15,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Area
              type="monotone"
              dataKey="cumulative_rr"
              stroke="var(--color-brand-primary)"
              fillOpacity={(dataMin, dataMax, Balance) => {
                const range = dataMax - dataMin;
                const normalizedValue = (Balance - dataMin) / range;
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
      )}
    </Fragment>
  );
};

export default StrategyCardAreChart;

StrategyCardAreChart.propTypes = {
  userId: PropTypes.string,
  strategyId: PropTypes.string,
};