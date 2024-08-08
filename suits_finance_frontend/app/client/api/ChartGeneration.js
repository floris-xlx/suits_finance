const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;

import axios from 'axios';

async function GenerateChart(tradeHash) {
    const data = {
        trade_hash: tradeHash,
        org: 'tbr'
    }

    const url = `${XYLEX_API_URL}/charts/generate`;

    const params = new URLSearchParams();
    params.append('trade_hash', data.trade_hash);
    params.append('org', data.org);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to send tp: ${response.status}`);
    }

    return response.data['image'];
}

export default GenerateChart;