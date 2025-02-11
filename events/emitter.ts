import dotenv from 'dotenv';
dotenv.config();
import EventEmitter from 'node:events';
import fs from 'fs/promises';
import { events } from './eventsName';

class FileEmitter extends EventEmitter {}
const emitter = new FileEmitter();

emitter.on(events.LOGWRITING_EVENT, async (data) => {
	process.nextTick(async () => {
		try {
			await fs.appendFile(
				process.env.LOG_PATH || 'logs/app.log',
				`${data}\n`
			);
		} catch (err) {
			console.error(
				'Error while trying to write data to file:',
				err.message
			);
		}
	});
});

export default emitter;
