const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;

import axios from 'axios';

async function SendTp(tradeHash, tp_type) {
    const data = {
        trade_hash: tradeHash,
        tp_type: tp_type
    }

    const url = `${XYLEX_API_URL}/internals/send_tp/diamant`;

    const params = new URLSearchParams();
    params.append('trade_hash', data.trade_hash);
    params.append('tp_type', data.tp_type);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to send tp: ${response.status}`);
    }

    return response.data['message'];
}

export default SendTp;