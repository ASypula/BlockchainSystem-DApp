// Changes date in datetime format to timestamp in seconds
export function dateToContract(date) {
  return new Date(date).getTime() / 1000;
}

// Converts timestamp in seconds to date in string format
export function dateFromContract(timestamp) {
  return new Date(Number(timestamp) * 1000).toDateString();
}

// Downloads a provided file to the user's browser
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
