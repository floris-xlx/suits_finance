const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;
const XYLEX_API_KEY = process.env.NEXT_PUBLIC_XYLEX_API_KEY;

import axios from 'axios';

async function CreateStrategyId(strategyName, userId) {
    const data = {
        strategyName: strategyName,
        userId: userId,
        apiKey: XYLEX_API_KEY
    }
    const url = `${XYLEX_API_URL}/hash/strategy/create`;

    const params = new URLSearchParams();
    params.append('user_id', data.userId);
    params.append('strategy_name', data.strategyName);
    params.append('api_key', data.apiKey);
    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to create strategy id: ${response.status}`);
    }

    return response.data['Ok'];
}

export default CreateStrategyId;