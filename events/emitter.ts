import EventEmitter from 'node:events';
import fs from 'fs/promises';
import { EVENTS_NAMES } from './eventsName';
import { ENV } from '../env.ts';

class FileEmitter extends EventEmitter {}
const emitter = new FileEmitter();

emitter.on(EVENTS_NAMES.LOGWRITING_EVENT, async (data) => {
	process.nextTick(async () => {
		try {
			await fs.appendFile(ENV.LOG_PATH, `${data}\n`);
		} catch (err) {
			console.error(
				'Error while trying to write data to file:',
				err.message
			);
		}
	});
});

export default emitter;
