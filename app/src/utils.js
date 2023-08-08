// Changes date in datetime format to timestamp in seconds
export function dateToContract(date) {
  return new Date(date).getTime() / 1000;
}

// Converts timestamp in seconds to date in string format
export function dateFromContract(timestamp) {
  return new Date(Number(timestamp) * 1000).toDateString();
}
