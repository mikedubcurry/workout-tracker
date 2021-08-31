import { getManager } from 'typeorm';
import { ExerciseType } from '../entity/ExerciseType';

import { Handler, Muscles } from '../types';

export const getExerciseTypes: Handler = async (req, res) => {
	const exerciseTypeRepository = getManager().getRepository(ExerciseType);

	const exerciseTypes = await exerciseTypeRepository.find();

	res.send(exerciseTypes);
};

export const createExerciseType: Handler = async (req, res) => {
	const userInput: ExerciseType = req.body;
	if (!userInput || !userInput.name || !userInput.muscleGroup) {
		return res.status(400).json({ message: 'must supply name and muscleGroup to create a new ExerciseType' });
	}

	const exerciseTypeRepository = getManager().getRepository(ExerciseType);
	const exerciseType = new ExerciseType();
	exerciseType.name = userInput.name.trim().toLowerCase();
	exerciseType.muscleGroup = userInput.muscleGroup.trim().toLowerCase() as Muscles;

	try {
		await exerciseTypeRepository.save(exerciseType);
		return res.send(exerciseType);
	} catch (e) {
		return res.status(500).json({ message: 'error saving ExerciseType' });
	}
};
