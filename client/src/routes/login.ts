import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';
import cookie from 'cookie';

export const post: RequestHandler = async ({ body, locals }) => {
	let formData = body as ReadOnlyFormData;
	const email = formData.get('email');
	const password = formData.get('password');

	let response = await fetch('http://localhost:3000/user/login', {
		method: 'post',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		let { token } = await response.json();

		return {
			headers: {
				'set-cookie': cookie.serialize('token', token, { secure: true, httpOnly: true })
			},
			status: 200
		};
	} else {
		console.log('error logging in');

		let err = await response.json();
		return { body: err, status: response.status };
	}
};
