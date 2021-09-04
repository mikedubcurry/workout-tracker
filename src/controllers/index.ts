import { verify } from 'jsonwebtoken';
import { Handler } from '../types';

export { getExerciseTypes, createExerciseType } from './exerciseTypes';
export { getExercises, createExercise, addExercisesToWorkout } from './exercise';
export { getWorkouts, createWorkout } from './workout';
export { createUser, login } from './user';

export const verifyToken: Handler = async (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		return res.status(401).json({ message: 'must include valid token for this request' });
	}

	try {
		const isValid = verify(token, process.env.jwt_secret!);
		if (isValid) {
			next && next();
		}
	} catch (err) {
		return res.status(401).json({ message: 'must include a valid token for this request' });
	}
};
