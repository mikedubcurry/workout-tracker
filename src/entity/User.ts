import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Workout } from './Workout';
import bcrypt from 'bcrypt';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@OneToMany(type => Workout, workout => workout.user)
	workouts!: Workout[]

	@BeforeInsert()
	hashPassword() {
		// TODO: use bcrypt instead
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
