const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;
const XYLEX_API_KEY = process.env.NEXT_PUBLIC_XYLEX_API_KEY;

import axios from 'axios';

async function SendSignal(tradeHash, organization) {
    const data = {
        trade_hash: tradeHash,
        organization: organization,
        api_key: XYLEX_API_KEY
    }

    const url = `${XYLEX_API_URL}/internals/send_signal/diamant`;

    const params = new URLSearchParams();
    params.append('trade_hash', data.trade_hash);
    params.append('organization', data.organization);
    params.append('api_key', data.api_key);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to send signal: ${response.status}`);
    }

    return response.data['Ok'];
}

export default SendSignal;