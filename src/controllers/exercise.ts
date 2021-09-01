import { getManager } from 'typeorm';
import { ExerciseType } from '../entity/ExerciseType';
import { Exercise } from '../entity/Exercise';

import { Handler, Muscles } from '../types';

export const getExercises: Handler = async (req, res) => {
	const exerciseRepository = getManager().getRepository(Exercise);

	const exercises = await exerciseRepository.find({ relations: ['workout'] });

	res.send(exercises);
};

export const createExercise: Handler = async (req, res) => {
	const userInput = req.body;
	if (
		!userInput ||
		!userInput.name ||
		!userInput.muscleGroup ||
		!userInput.reps ||
		!userInput.sets
		// !userInput.weight
	) {
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
};
