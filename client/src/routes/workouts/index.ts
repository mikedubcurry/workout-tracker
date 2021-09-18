import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

export const get: RequestHandler = async ({ headers }) => {
	const response = await fetch('http://localhost:3000/api/workouts', { headers });
	const data = await response.json();

	return { body: data };
};

export const post: RequestHandler = async ({ headers, body }) => {
	const formData = body as ReadOnlyFormData;

	const date = formData.get('date');
	const intensity = formData.get('intensity');
	console.log({ date, intensity });
	console.log(headers);

	const response = await fetch('http://localhost:3000/api/workouts', {
		method: 'post',
		mode: 'cors',
		headers: { ...headers, 'content-type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({ date, intensity })
	});
	// console.log(response);

	if (response.ok) {
		const data = await response.json();

		return { body: data };
	} else {
		return {
			status: response.status,
			body: await response.json()
		};
	}
};

export const del: RequestHandler = async ({ headers, body }) => {
	console.log(body);
	
	fetch('http://localhost:3000/api/workouts', {
		method: 'delete',
		body: JSON.stringify(body),
		headers: {
			...headers,
			'content-type': 'application/json'
		}
	});
	return { status: 200 };
};
