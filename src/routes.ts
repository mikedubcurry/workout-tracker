import {
	getExerciseTypes,
	createExerciseType,
	getExercises,
	getWorkouts,
	createWorkout,
	createExercise,
	addExercisesToWorkout,
	createUser,
	login,
} from './controllers';
import { Route } from './types';

export const routes: Route[] = [
	// users
	{
		path: '/user/signup',
		method: 'post',
		action: createUser,
	},

	{
		path: '/user/login',
		method: 'post',
		action: login,
	},

	// exerciseTypes
	{
		path: '/api/exerciseTypes',
		method: 'get',
		action: getExerciseTypes,
	},

	{
		path: '/api/exerciseTypes',
		method: 'post',
		action: createExerciseType,
	},

	// exercises
	{
		path: '/api/exercises',
		method: 'get',
		action: getExercises,
	},

	{
		path: '/api/exercises',
		method: 'post',
		action: createExercise,
	},

	// workouts
	{
		path: '/api/workouts',
		method: 'get',
		action: getWorkouts,
	},

	{
		path: '/api/workouts',
		method: 'post',
		action: createWorkout,
	},

	{
		path: '/api/workouts/exercises',
		method: 'post',
		action: addExercisesToWorkout,
	},
];

export const protectedRoutes: Route[] = [];
