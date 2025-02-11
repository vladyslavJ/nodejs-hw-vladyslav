import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import levels from './levels.ts';
import formatMessage from './formatter.ts';
import emitter from '../events/emitter.ts';
import { events } from '../events/eventsName.ts';

const LOG_PATH = process.env.LOG_PATH || 'logs/app.log';

class Logger {
	constructor(private logPath: string = LOG_PATH) {
		this.logPath = logPath;

		if (!fs.existsSync(path.dirname(this.logPath))) {
			fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
		}
	}

	private __log(level: levels, msg: string | Error) {
		const fromattedMsg = formatMessage(level, msg);
		console.log(fromattedMsg);
		
		try {
			emitter.emit(events.LOGWRITING_EVENT, fromattedMsg);
		} catch (err) {
			console.log('Failed to emit log event...');
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
