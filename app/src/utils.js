export function dateToContract(date) {
  return new Date(date).getTime() / 1000;
}

export function dateFromContract(timestamp) {
  return new Date(Number(timestamp) * 1000).toDateString();
}
