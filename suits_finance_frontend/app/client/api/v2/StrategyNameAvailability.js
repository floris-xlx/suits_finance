const XYLEX_API_V2_URL = process.env.NEXT_PUBLIC_XYLEX_API_V2_URL;

import axios from 'axios';

async function StrategyNameAvailabilityApi(
    strategyName,
    userId
) {
    const url = `${XYLEX_API_V2_URL}/strategy/name_available`;

    const params = new URLSearchParams();
    params.append('strategy_name', strategyName);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to check availability strategy name: ${response.status}`);
    }

    const result = {
        available: response.data.available,
        strategy_name: response.data.strategy_name
    };

    return result;
}

export {
    StrategyNameAvailabilityApi
}