import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Exercise } from './Exercise';
import { Intensity } from '../types';

@Entity()
export class Workout {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	date!: Date;

	@Column()
	intensity!: Intensity;

	@OneToMany((type) => Exercise, (exercise) => exercise.workout)
	exercises!: Exercise[];
}
