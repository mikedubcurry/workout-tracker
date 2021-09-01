import { getManager } from 'typeorm';
import { ExerciseType } from '../entity/ExerciseType';
import { Exercise } from '../entity/Exercise';

import { Handler, Muscles } from '../types';

export const getExercises: Handler = async (req, res) => {
	const exerciseRepository = getManager().getRepository(Exercise);

	const exercises = await exerciseRepository.find();

	res.send(exercises);
};

export const createExercise: Handler = async(req, res) => {
  const userInput = req.body;
  if(!userInput || userInput.name || !userInput.muscleGroup || !userInput.reps || !userInput.sets || ! userInput.weight) {
    return res.status(400).json({message: "must include name, muscleGroup, reps, sets, and weight to create a new Exercise"})
  }

  
}