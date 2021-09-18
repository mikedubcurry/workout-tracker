import { getManager } from 'typeorm';

import { Exercise, Workout } from '../entity';
import { Handler, Muscles } from '../types';

export const getUniqueExercises: Handler = async (req, res) => {
	const exerciseRepository = getManager().getRepository(Exercise);

	const exercises = await exerciseRepository.find({select: ['name', 'muscleGroup', 'id']});
	const unique = exercises.reduce((unq, ex) => {
		if (!unq.some((i) => i.name === ex.name)) {
			unq.push(ex);
		}
		return unq;
	}, [] as Exercise[]);
	res.send(unique);
};

export const createExercise: Handler = async (req, res) => {
	const userInput = req.body;
	if (!userInput || !userInput.name || !userInput.muscleGroup || !userInput.reps || !userInput.sets) {
		return res
			.status(400)
			.json({ message: 'must include name, muscleGroup, reps, sets, and weight to create a new Exercise' });
	}

	const exerciseRepository = getManager().getRepository(Exercise);
	const exercise = new Exercise();
	exercise.name = userInput.name.trim();
	exercise.muscleGroup = userInput.muscleGroup.trim();
	exercise.reps = userInput.reps;
	exercise.sets = userInput.sets;
	exercise.weight = userInput.weight;

	try {
		await exerciseRepository.save(exercise);
		return res.send(exercise);
	} catch (e) {
		return res.status(500).json({ message: 'failed to create exercise' });
	}
};

export const addExercisesToWorkout: Handler = async (req, res) => {
	const userInput = req.body;

	if (!userInput || !userInput.workout || (!userInput.exercises && !userInput.exercises.length)) {
		return res.status(400).json({ message: 'must supply workoutID and array of exercises' });
	}

	const exerciseRepository = getManager().getRepository(Exercise);
	const exercises = await exerciseRepository.findByIds(userInput.exercises);
	const workoutRepository = getManager().getRepository(Workout);
	const workout = await workoutRepository.findOne(userInput.workout);
	if (workout) {
		exercises.forEach((ex) => {
			ex.workout = workout;
		});
		workout.exercises = exercises;
	} else {
		return res.status(400).json({ message: 'workout does not exist' });
	}
	try {
		await workoutRepository.save(workout);
		console.log(workout);

		res.json({ id: workout.id });
	} catch (e) {
		return res.status(500).json({ message: 'failed to save exercises to workout' });
	}
};
