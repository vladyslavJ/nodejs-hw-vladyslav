import EventEmitter from 'node:events';
import { Transform } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import { EVENTS_NAMES } from './eventsName';
import chalk from 'chalk';
import levels from '../logger/levels.ts';

type LogObject = {
	level: keyof typeof levels;
	msg: string;
};

class FileEmitter extends EventEmitter {}
const emitter = new FileEmitter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const destinationFilePath = path.join(__dirname, 'logs', 'app.log');
const writeStream = fs.createWriteStream(destinationFilePath, { flags: 'a' });

const formatMsg = (chunk): string => {
	const timestamp = new Date().toISOString();
	switch (chunk.level) {
		case levels.INFO:
			return chalk.blue(`[${timestamp}], INFO: ${chunk.msg}`) + `\n`;

		case levels.WARNING:
			return chalk.yellow(`[${timestamp}], WARNING: ${chunk.msg}`) + `\n`;

		case levels.ERROR:
			return chalk.red(`[${timestamp}], ERROR: ${chunk.msg}`) + `\n`;

		default:
			return chalk.gray(`[${timestamp}], UNKNOWN: ${chunk.msg}`) + `\n`;
	}
};

emitter.on(EVENTS_NAMES.LOGWRITING_EVENT, async (obj: LogObject) => {
	process.nextTick(async () => {
		try {
			const transformStream = new Transform({
				objectMode: true,
				async transform(chunk, encoding, callback) {
					const formattedMsg = formatMsg(chunk);
					this.push(formattedMsg);
					callback();
				},
			});

			transformStream.write(obj);
			transformStream.pipe(writeStream);
		} catch (err) {
			console.error(err.message);
		}
	});
});

export default emitter;
