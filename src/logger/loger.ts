import dotenv from "dotenv";
dotenv.config();
export class Logger {
  constructor(
    private readonly log = console,
    private readonly environment = process.env.NODE_ENV === "DEV"
  ) {}

  logError(err: Error): void {
    if (this.environment) {
      this.log.error(err.message);
    }
  }

  logMessage(message: string): void {
    if (this.environment) {
      this.log.log(message);
    }
  }
}
