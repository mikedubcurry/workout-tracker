import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Muscles } from '../types';

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

	@Column()
	weight!: number;
}
