import React from 'react';

import PropTypes from 'prop-types';

const TradingViewLink = ({ symbol, timeframe }) => {
    const symbolUppercase = symbol.toUpperCase();

    const timeframe_map = {
        "1min": 1,
        "5min": 5,
        "15min": 15,
        "1h": 60,
        "4h": 240,
        "1d": 1440,
        "1w": 10080,
        "1mo": "1M"
    };
    const newLink = `https://www.tradingview.com/chart/?symbol=FX%3A${symbolUppercase}&interval=${timeframe_map[timeframe]}`;

    return (
        <a
            href={newLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary flex flex-row gap-x-1 items-center mt-8 bg-brand-primary p-2 rounded-md text-white text-sm hover:transition hover:bg-brand-secondary select-none w-fit mx-auto"
        >
            TradingView chart
        </a>
    );
}

export default TradingViewLink;

TradingViewLink.propTypes = {
    symbol: PropTypes.string.isRequired,
    timeframe: PropTypes.string.isRequired
};