const LEGACY_XYLEX_API_URL = process.env.NEXT_PUBLIC_LEGACY_API_URL;
const LEGACY_XYLEX_API_KEY = process.env.NEXT_PUBLIC_LEGACY_API_KEY;

import axios from 'axios';

async function ApproveSignalTradesByRob(tradeHash) {
    const data = {
        trade_hash: tradeHash,
        api_key: LEGACY_XYLEX_API_KEY,
        approved: 'True'
    }

    const url = `https://api.xylex.ai/internals/approve_signal`;

    const params = new URLSearchParams();
    params.append('trade_hash', data.trade_hash);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to approve signal: ${response.status}`);
    }

    return response.status;
}

export {
    ApproveSignalTradesByRob
}