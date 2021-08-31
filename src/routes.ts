import { getExerciseTypes, createExerciseType } from './controllers';
import { Route } from './types';

export const routes: Route[] = [
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
];
