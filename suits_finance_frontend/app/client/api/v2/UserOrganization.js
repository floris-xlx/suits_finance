const XYLEX_API_V2_URL = process.env.NEXT_PUBLIC_XYLEX_API_V2_URL;

import axios from 'axios';

async function UserOrganization(user_id) {
    const url = `${XYLEX_API_V2_URL}/user/organization`;

    const params = new URLSearchParams();
    params.append('user_id', user_id);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });



    if (response.status !== 200) {
        throw new Error(`Failed to check fetch auth state: ${response.status}`);
    }

    const result = {
        organization: response.data.organization,
        user_id: response.data.user_id
    };

    return result;
}

export {
    UserOrganization
}