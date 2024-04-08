const moment = require("moment");

function ConvertTo12Hour(time) {
  const [hour, minute] = time.split(":");
  return moment({ hour, minute }).format("hh:mm A");
}

function ConvertTo24Hour(time) {
  return moment(time, ["h:mm A"]).format("HH:mm");
}

function Validate12Hour(time) {
  let regexMatch = time.match(/(\d{2}):(\d{2}) (AM|PM)/i);
  if (regexMatch) {
    let hour = parseInt(regexMatch[1]);
    return hour <= 12 && moment(time, "hh:mm A").isValid();
  }
  return false;
}

module.exports = {
  ConvertTo12Hour,
  ConvertTo24Hour,
  Validate12Hour,
};
