const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;
const XYLEX_API_KEY = process.env.NEXT_PUBLIC_XYLEX_API_KEY;

import axios from 'axios';

async function CreateTradeHash(organization, symbol, unixTime, entryLevel) {
    const data = {
        user_id: organization,
        pairname: symbol,
        time: unixTime,
        entry: entryLevel,
        api_key: XYLEX_API_KEY
    }

    const url = `${XYLEX_API_URL}/hash/trade/create`;

    const params = new URLSearchParams();
    params.append('user_id', data.user_id);
    params.append('pairname', data.pairname);
    params.append('time', data.time);
    params.append('entry', data.entry);
    params.append('api_key', data.api_key);



    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to request trade hash: ${response.status}`);
    }

    return response.data['Ok'];
}

export default CreateTradeHash;