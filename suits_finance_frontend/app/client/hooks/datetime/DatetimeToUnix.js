function datetimeToUnix(input) {
  // Force the input into a string
  const datetimeStr = String(input);

  // Define the expected format
  const format = "ddd DD MMM HH:mm";

  // Parse the datetime string using a regular expression
  const regex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}):(\d{2})$/;
  const match = datetimeStr.match(regex);

  if (!match) {
    console.warn(`Invalid date format, returning "0". This was the input: ${datetimeStr}`);
    return "0";
  }

  // Map month names to their respective numbers
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const day = parseInt(match[2], 10);
  const month = monthMap[match[3]];
  const hours = parseInt(match[4], 10);
  const minutes = parseInt(match[5], 10);

  // Create a new Date object
  const date = new Date();
  date.setUTCMonth(month);
  date.setUTCDate(day);
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date format, returning "0". This was the input: ${datetimeStr}`);
    return "0";
  }

  // Convert to Unix time (seconds since Jan 1, 1970)
  return Math.floor(date.getTime() / 1000).toString();
}
export default datetimeToUnix;