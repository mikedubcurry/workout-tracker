import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ request, resolve }) => {
	// if user is logged in, token will be equal to `token=<JWT>` and can be used to populate req.locals
	const { token } = cookie.parse(request.headers.cookie || '');
	if (token) {
		request.locals.user = token.split('"')[0];
	} else {
		request.locals.user = undefined;
	}

	const response = await resolve(request);

	if (request.locals.user) {
		return { ...response, headers: { ...response.headers } };
	}
	return {
		...response
	};
};

export const getSession: GetSession = (request) => {
	console.log('getSession', request.locals);

	return request.locals;
};
