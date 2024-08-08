const XYLEX_API_V2_URL = process.env.NEXT_PUBLIC_XYLEX_API_V2_URL;

import axios from 'axios';

async function StrategyPnlChartApi(strategy_id, data_length) {
    const url = `${XYLEX_API_V2_URL}/strategies/equity_pnl`;

    const urlParams = new URLSearchParams(window.location.search);
    let strategy = urlParams.get('strategy');

    if (!strategy) {
        strategy = strategy_id;
    }

    if (strategy == null) {
        throw new Error('Invalid strategy. Strategy cannot be null or undefined');
    }

    const params = new URLSearchParams();
    params.append('strategy_id', strategy);
    params.append('data_length', data_length);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to fetch the strategy pnl chart: ${response.status}`);
    }

    return response.data;
}

export {
    StrategyPnlChartApi
}