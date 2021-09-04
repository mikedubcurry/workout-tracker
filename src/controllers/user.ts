import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../entity';
import { Handler } from '../types';

export const createUser: Handler = async (req, res) => {
	const userInput = req.body;

	if (!userInput || !userInput.email || !userInput.password) {
		return res.status(400).json({ message: 'must provide email and password to create a user' });
	}

	const userRepository = getManager().getRepository(User);

	const { length: userExists } = await userRepository.find({ where: { email: userInput.email } });

	if (userExists) {
		return res.status(400).json({ message: `user ${userInput.email} already exists` });
	}

	const user = new User();
	user.email = userInput.email;
	user.password = userInput.password;

	try {
		await userRepository.save(user);
		const token = sign({ email: user.email, id: user.id }, process.env.jwt_secret!, { expiresIn: '1hr' });

		res.json({token});
	} catch (e) {
		res.status(500).json({ message: 'failed creating the user: ', e });
	}
};

export const login: Handler = async (req, res) => {
	const userInput = req.body;
	if (!userInput || !userInput.email || !userInput.password) {
		return res.status(400).json({ message: 'must supply email and password to log in' });
	}

	const userRepository = getManager().getRepository(User);

	const user = await userRepository.findOne({ email: userInput.email });

	if (!user) {
		return res.status(401).json({ message: 'incorrect email or password' });
	}

	const passwordsMatch = bcrypt.compareSync(userInput.password, user.password);

	if (!passwordsMatch) {
		return res.status(401).json({ message: 'incorrect email or password' });
	}

	const token = sign({ email: user.email, id: user.id }, process.env.jwt_secret!, { expiresIn: '1hr' });

	res.send(token);
};
