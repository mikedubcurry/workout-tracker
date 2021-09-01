import { getExerciseTypes, createExerciseType, getExercises } from './controllers';
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
];
