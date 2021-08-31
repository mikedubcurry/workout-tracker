import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cardio {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	duration!: number;
}
