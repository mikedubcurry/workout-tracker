import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Muscles } from '../types';

@Entity()
export class ExerciseType {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	name!: string;

	@Column()
	muscleGroup!: Muscles;

	// @OneToMany()
}
