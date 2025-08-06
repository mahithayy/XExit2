const axios = require("axios");
const moment = require("moment");

const isWorkingDay = async (dateStr, countryCode = "IN") => {
  // Short-circuit for testing
  //if (process.env.NODE_ENV === "test") return true;

  const date = moment(dateStr);
  const dayOfWeek = date.isoWeekday();

  // Reject weekends (Saturday = 6, Sunday = 7)
  if (dayOfWeek >= 6) return false;

  const API_KEY = process.env.CALENDARIFIC_KEY;
  const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${countryCode}&year=${date.year()}&month=${date.month() + 1}&day=${date.date()}`;

  try {
    const response = await axios.get(url);
    const holidays = response.data.response.holidays;

    return holidays.length === 0; // true if no holiday
  } catch (error) {
    console.error("Calendarific error:", error.message);
    return false; // Fail-safe: treat error as holiday
  }
};

module.exports = isWorkingDay;
