import express from 'express';
import helmet from 'helmet';
import { handler } from './build/handler.js';

const app = express();

app.get('/healthcheck', (req, res) => {
	res.send('OK');
});

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				scriptSrc: ["'self'", "'sha256-sGEYYorwwz3w81/sFH/tgn8cbI7+xUyVtjPUmB/1crE='"]
			}
		}
	})
);

app.use(handler);

app.listen(3000, () => {
	console.log('Server is running on port port 3000');
});
