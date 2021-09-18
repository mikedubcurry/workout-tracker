import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

export const post: RequestHandler = async ({ body }) => {
	let formData = body as ReadOnlyFormData;
	const email = formData.get('email');
	const password = formData.get('password');
	console.log(email, password);

	let response = await fetch('http://localhost:3000/user/signup', {
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
		let token = await response.json();
		console.log(token);

		return { body: { token } };
	} else {
		let err = await response.json();
		return { body: err, status: response.status };
	}
};
