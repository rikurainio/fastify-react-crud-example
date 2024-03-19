import chalk from "chalk";

class Logger {
  public static info(prefix: string, message: string) {
    console.log(`[${chalk.cyanBright(prefix)}] ${message}`);
  }

  public static error(prefix: string, message: string) {
    console.log(`[${chalk.red(prefix)}] ${message}`);
  }

  public static success(prefix: string, message: string) {
    console.log(`[${chalk.green(prefix)}] ${message}`);
  }
}

export { Logger };