import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Exercise } from './Exercise';
import { Intensity } from '../types';

@Entity()
export class Workput {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	date!: Date;

	@Column()
	intensity!: Intensity;

	@ManyToMany((type) => Exercise)
	@JoinTable()
	exercises!: Exercise[];
}
