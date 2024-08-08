/**
 * Rounds a given float to a maximum of 4 decimal places.
 * @param {number} value - The float number to be rounded.
 * @returns {number} - The rounded number.
 */
function roundToFourDigits(value) {
    if (typeof value === 'number') {
        return Math.round(value * 10000) / 10000;
    } else {
        console.error('Value is not a number');
        return null;
    }
}

function roundToTwoDigits(value) {
    if (typeof value === 'number') {
        return Math.round(value * 100) / 100;
    } else {
        console.error('Value is not a number');
        return null;
    }
}

export { roundToFourDigits, roundToTwoDigits };