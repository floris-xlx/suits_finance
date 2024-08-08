const XYLEX_API_PAYMENTS_URL = process.env.NEXT_PUBLIC_XYLEX_API_PAYMENTS_URL;

import axios from 'axios';

async function AuthUser(email, organization) {
    const url = `${XYLEX_API_PAYMENTS_URL}/auth`;
    console.log(url);
    console.log(email);
    console.log(organization);

    const params = new URLSearchParams();
    params.append('email', email);

    const urlWithParams = `${url}?${params.toString()}`;

    console.log(urlWithParams);

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    console.log(response);

    if (response.status === 401) {
        return {
            authenticated: false,
            email: email,
            organization: organization,
            provider: null
        };
    }


    if (response.status !== 200) {
        throw new Error(`Failed to check fetch auth state: ${response.status}`);
    }

    const result = {
        authenticated: response.data.authenticated,
        email: response.data.email,
        organization: response.data.organization,
        provider: response.data.provider
    };

    return result;
}

export {
    AuthUser
}