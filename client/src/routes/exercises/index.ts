import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ headers }) => {
	const response = await fetch('http://localhost:3000/api/exercises', { headers });
	const data = await response.json();
	console.log(data);

	return { body: data };
};
