// Log levels
const LOG_LEV = (message, ...optionalParams) => {};

/**
 * Custom logger implementation that outputs messages to the console
 * Allows for setting desired log level
 */
class Logger {
  constructor(options = { level: undefined }) {
    const { level } = options;

    this.error = console.error.bind(console);

    if (level === "error") {
      this.warn = LOG_LEV;
      this.log = LOG_LEV;
      return;
    }

    this.warn = console.warn.bind(console);

    if (level === "warn") {
      this.log = LOG_LEV;
      return;
    }

    this.log = console.log.bind(console);
  }
}

export default Logger;
