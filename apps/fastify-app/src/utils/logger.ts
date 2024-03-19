import chalk from "chalk";

class Logger {
	constructor() {
		this.info = this.info.bind(this);
		this.error = this.error.bind(this);
		this.success = this.success.bind(this);
	}

	info(prefix: string, message: string) {
		console.log(`[${chalk.cyanBright(prefix)}] ${message}`);
	}
	error(prefix: string, message: string) {
		console.log(`[${chalk.red(prefix)}] ${message}`);
	}
	success(prefix: string, message: string) {
		console.log(`[${chalk.green(prefix)}] ${message}`);
	}
}

const logger = new Logger();
export { logger };
