import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Muscles } from '../types';
import { Workout } from './';

@Entity()
export class Exercise {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	muscleGroup!: Muscles;

	@Column()
	reps!: number;

	@Column()
	sets!: number;

	@Column({ nullable: true })
	weight!: number;

	@ManyToOne((type) => Workout, (workout) => workout.exercises)
	workout!: Workout;
}
