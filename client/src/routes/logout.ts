import cookie from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ locals }) => {
	return {
		headers: {
			'set-cookie': cookie.serialize('token', '', { secure: true, httpOnly: true })
		},
		status: 301,
		location: '/'
	};
};
