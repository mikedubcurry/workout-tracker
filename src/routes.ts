import {
	getExerciseTypes,
	createExerciseType,
	getExercises,
	getWorkouts,
	createWorkout,
	createExercise,
	addExercisesToWorkout,
} from './controllers';
import { Route } from './types';

export const routes: Route[] = [
	// exerciseTypes
	{
		path: '/exerciseTypes',
		method: 'get',
		action: getExerciseTypes,
	},

	{
		path: '/exerciseTypes',
		method: 'post',
		action: createExerciseType,
	},

	// exercises
	{
		path: '/exercises',
		method: 'get',
		action: getExercises,
	},
	{
		path: '/exercises',
		method: 'post',
		action: createExercise,
	},

	// workouts
	{
		path: '/workouts',
		method: 'get',
		action: getWorkouts,
	},
	{
		path: '/workouts',
		method: 'post',
		action: createWorkout,
	},
	{
		path: '/workouts/exercises',
		method: 'post',
		action: addExercisesToWorkout,
	},
];
