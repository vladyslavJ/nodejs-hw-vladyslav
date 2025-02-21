import http, { IncomingMessage, ServerResponse } from 'node:http';
import { ENV } from './env.ts';

let count = 0;

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		let body = '';

		console.log(`Отримано запит: ${req.method} ${req.url}`);

		req.on('data', (data: any) => {
			body += data.toString();
		});

		setTimeout(() => {
			count++;
			if (count % 10 === 0) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error\n');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end(`res number ${count}, all right ${body}`);
			}
		}, (Math.floor(Math.random() * 3) + 1) * 1000);

		req.on('error', () => {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Bad Request\n');
		});
	}
);

server.listen(ENV.APP_PORT, () => {
	console.log(`Server is running on port http://localhost:${ENV.APP_PORT}`);
});
