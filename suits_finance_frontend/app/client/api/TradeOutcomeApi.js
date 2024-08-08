const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;
const XYLEX_API_KEY = process.env.NEXT_PUBLIC_XYLEX_API_KEY;

import axios from 'axios';

async function CreateTradeHash(tradeHash, userId) {
    const data = {
        tradeHash: tradeHash,
        userId: userId,
        apiKey: XYLEX_API_KEY
    }
    const url = `${XYLEX_API_URL}/compute/determine/trade_status`;

    const params = new URLSearchParams();
    params.append('trade_hash', data.tradeHash);
    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to calculate output: ${response.status}`);
    }

    return response.data['Ok'];
}

export default CreateTradeHash;