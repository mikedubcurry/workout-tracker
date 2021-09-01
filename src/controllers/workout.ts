import { getManager } from 'typeorm';
import { Workout } from '../entity/Workout';

import { Handler } from '../types';

export const getWorkouts: Handler = async (req, res) => {
	const workoutRepository = getManager().getRepository(Workout);
	const workouts = await workoutRepository.find({relations: ['exercises']});

	return res.send(workouts);
};

export const createWorkout: Handler = async (req, res) => {
	const userInput = req.body;

	if (!userInput || !userInput.date || !userInput.intensity) {
		return res.status(400).json({ message: 'must supply date and intensity to create a workout' });
	}

	const workoutRepository = getManager().getRepository(Workout);
	const workout = new Workout();
	workout.date = userInput.date;
	workout.intensity = userInput.intensity;
	workout.exercises = [];

	try {
		await workoutRepository.save(workout);
		return res.send(workout);
	} catch (e) {
		return res.json({ message: 'failed to create workout' });
	}
};

// export const addExercisesToWorkout: Handler = async (req, res) => {
// 	const userInput = req.body;
// 	if (!userInput || !userInput.workout || (!userInput.exercises && !userInput.exercises.length)) {
// 		return res.status(400).json({ message: 'must supply workoutId and an array of exerciseIds' });
// 	}

// 	const workoutRepository = getManager().getRepository(Workout);
// 	let workout;
// 	try {
// 		workout = await workoutRepository.findOne({ id: userInput.workout });
// 		console.log(workout);
// 	} catch (e) {
// 		return res.status(400).json({ message: 'workout does not exist' });
// 	}

// 	try {
// 		await workoutRepository.update(userInput.workout, { exercises: userInput.exercises });
// 		return res.send('success');
// 	} catch (e) {
// 		console.log(e);

// 		return res.status(500).json({ message: 'failed to update workout' });
// 	}
// };
