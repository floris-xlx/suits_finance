const XYLEX_API_V2_URL = process.env.NEXT_PUBLIC_XYLEX_API_V2_URL;

import axios from 'axios';

async function StrategyCreateApi(
    username,
    strategyName,
    strategyId,
    organizationId,
) {
    const url = `${XYLEX_API_V2_URL}/strategy/name_create`;

    if (!username) {
        throw new Error('Username is required');
    }
    if (!strategyName) {
        throw new Error('Strategy name is required');
    }

    if (!strategyId) {
        throw new Error('Strategy ID is required');
    }

    const params = new URLSearchParams();
    params.append('strategy_name', strategyName);
    params.append('strategy_id', strategyId);
    params.append('organization_id', organizationId);
    const urlWithParams = `${url}?${params.toString()}`;
    
    const response = await axios.post(urlWithParams);

    if (response.status !== 200) {
        throw new Error(`Failed to create strategy: ${response.status}`);
    }

    const result = {
        created: response.data.created,
        strategy_name: response.data.strategy_name
    };

    return result;
}

export {
    StrategyCreateApi
}