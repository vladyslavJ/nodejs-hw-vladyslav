import fs from 'fs';
import path from 'path';
import levels from './levels.ts';
import formatMessage from './formatter.ts';
import { LOCAL_ENV } from '../env.ts';

class Logger {
	private logPath: string;

	constructor(logPath = 'logs/app.log') {
		this.logPath = logPath;

		if (!fs.existsSync(path.dirname(this.logPath))) {
			fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
		}
	}

	private __log(level: levels, msg: string | Error) {
		const fromattedMsg = formatMessage(level, msg);

		if (process.env['APP_ENV'] === LOCAL_ENV) {
			console.log(fromattedMsg);
		} else {
			fs.appendFile(this.logPath, `${fromattedMsg} \n`, (err) => {
				if (err) {
					console.error(
						'Error while try to put data to file',
						err.message
					);
				}
			});
		}
	}

	public info(msg: string | Error) {
		this.__log(levels.INFO, msg);
	}

	public warning(msg: string | Error) {
		this.__log(levels.WARNING, msg);
	}

	public error(msg: string | Error) {
		this.__log(levels.ERROR, msg);
	}
}

export default Logger;
