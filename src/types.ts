import type {Request, Response, NextFunction} from 'express'

export type Exercise = {
	exercise: string;
	muscles: Muscles;
	area: Area;
};

export type Muscles =
	| 'pectorals'
	| 'deltoids'
	| 'biceps'
	| 'triceps'
	| 'quads'
	| 'hamstrings'
	| 'calves'
	| 'abdominals'
	| 'lats'
	| 'trapezius'
	| 'obliques'
	| 'glutes';

export type Area = 'upper body' | 'arms' | 'legs' | 'abs';

export type Intensity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Workout = {
	exercise: Exercise;
	startingWeight: number;
	reps: number;
	sets: number;
	intensity: Intensity;
};

export type Cardio = {
	machine: 'eliptical' | 'treadmill' | 'bike';
	intensity: number;
	duration: number;
};

export type WorkoutSession = {
	workouts: Workout[];
	cardio: Cardio;
	date: Date;
};

export type Route = {
	path: string;
	method: 'get' | 'delete' | 'post' | 'patch' | 'put';
	action: Handler
};

export type Handler = (req: Request, res: Response, next?: NextFunction) => Promise<any>