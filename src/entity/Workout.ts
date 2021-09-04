import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Exercise } from './Exercise';
import { Intensity } from '../types';
import { User } from './';

@Entity()
export class Workout {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	date!: Date;

	@Column()
	intensity!: Intensity;

	@OneToMany((type) => Exercise, (exercise) => exercise.workout, { cascade: true })
	exercises!: Exercise[];

	@ManyToOne((type) => User, user => user.workouts)
	user!: User;
}
