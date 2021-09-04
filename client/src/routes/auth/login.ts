import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

export const post: RequestHandler = async ({ body }) => {
	let formData = body as ReadOnlyFormData;
	const email = formData.get('email');
	const password = formData.get('password');
	return { body: { email, password } };
};
