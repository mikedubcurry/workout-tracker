import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { routes } from './routes';

const port = process.env.PORT || 3000;

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(cors());
		app.use(express.json());
		// await connection.dropDatabase()
		// app.get('/', async (req, res) => {
		// 	let exType = new ExerciseType();
		// 	exType.name = 'pushups';
		// 	exType.muscleGroup = 'pectorals';
		// 	try {
		// 		await connection.manager.save(exType);
		// 		res.send('good to go!');
		// 	} catch (e) {
		// 		res.send('already exists');
		// 	}
		// });

		// app.get('/exType', async (req, res) => {
		// 	const exType = await connection.getRepository(ExerciseType).find();

		// 	res.json({ exType });
		// });
		routes.forEach((route) => {
			app[route.method](route.path, (req, res, next) => {
				route
					.action(req, res)
					.then(() => next)
					.catch((err) => next(err));
			});
		});

		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
