import { tokenForUser } from '../../controllers/user';
import { User } from '../../entity';
import { decode } from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: '.env.test' });

describe('user controller', () => {
	it('should create a jwt for user', () => {
		let user = new User();
		user.email = 'mike';
		user.password = 'password';
		user.id = 1;

		let token = tokenForUser(user);

		expect(token).toBeTruthy();

		let decoded = decode(token) as User;

		expect(decoded).toHaveProperty('email');
		expect(decoded).toHaveProperty('id');
	});
});
