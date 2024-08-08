const XYLEX_API_V2_URL = process.env.NEXT_PUBLIC_XYLEX_API_V2_URL;

import axios from 'axios';

async function UsernameAvailable(username) {
    const url = `${XYLEX_API_V2_URL}/user/name_available`;

    const params = new URLSearchParams();
    params.append('username', username);
    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to check username availability: ${response.status}`);
    }

    const result = {
        available: response.data.available,
        username: response.data.username
    };

    return result;
}

export {
    UsernameAvailable
}