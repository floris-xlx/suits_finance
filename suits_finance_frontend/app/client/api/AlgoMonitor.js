import axios from 'axios';

async function AlgoMonitor() {
    const url = `https://api.xylex.ai/internals/xylex_core/algo_state`;

    const response = await axios.get(url, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to get algo monitor: ${response.status}`);
    }

    return response;
}

export {
    AlgoMonitor
}