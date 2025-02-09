import chalk from 'chalk';
import levels from './levels.ts';


const formatMessage = (level: levels, msg: string | Error) => {
	const timestamp = new Date().toISOString();

	if (msg instanceof Error) {
		msg = msg.message.trim() ? `${msg.name} -> ${msg.message}` : msg.name;
	}

	switch (level) {
		case levels.INFO:
			return chalk.blue(`[${timestamp}], INFO: ${msg}`);

		case levels.WARNING:
			return chalk.yellow(`[${timestamp}], WARNING: ${msg}`);

		case levels.ERROR:
			return chalk.red(`[${timestamp}], ERROR: ${msg}`);

		default:
			return chalk.gray(`[${timestamp}], UNKNOWN: ${msg}`);
	}
};

export default formatMessage;
