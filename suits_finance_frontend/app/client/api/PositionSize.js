const XYLEX_API_URL = process.env.NEXT_PUBLIC_XYLEX_API_URL;

import axios from 'axios';

import PropTypes from 'prop-types';

async function PositionSizeApi(accountBalance, riskPercentage, stoplossPips, symbol) {
    const data = {
        account_currency: "usd",
        account_balance: accountBalance,
        risk_percentage: riskPercentage,
        stoploss_pips: stoplossPips,
        symbol: symbol
    }

    const url = `${XYLEX_API_URL}/compute/position_size`;

    const params = new URLSearchParams();
    params.append('account_currency', data.account_currency);
    params.append('account_balance', data.account_balance);
    params.append('risk_percentage', data.risk_percentage);
    params.append('stoploss_pips', data.stoploss_pips);
    params.append('symbol', data.symbol);

    const urlWithParams = `${url}?${params.toString()}`;

    const response = await axios.get(urlWithParams, { mode: 'no-cors' });

    if (response.status !== 200) {
        throw new Error(`Failed to calculate position size: ${response.status}`);
    }

    return response.data;
}

export default PositionSizeApi;

PositionSizeApi.propTypes = {
    accountBalance: PropTypes.number.isRequired,
    riskPercentage: PropTypes.number.isRequired,
    stoplossPips: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired
}