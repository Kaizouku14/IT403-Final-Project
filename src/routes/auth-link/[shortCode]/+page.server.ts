import type { Actions } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect, error } from '@sveltejs/kit';
import { getLink, verifyPassword } from '$lib/helper/helper.ts';
import { formSchema } from '$lib/components/schema/schema.ts';

export const load = async ({ params }) => {
	const link = await getLink(params.shortCode);

	if (!link.password) throw error(404, 'This short link does not exist or has expired');

	return {
		form: await superValidate(zod4(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { shortCode } = event.params;
		const { password } = form.data;

		const link = await getLink(shortCode);
		const isMatch = await verifyPassword(password, link.password!);
		if (isMatch) {
			throw redirect(302, link.destinationUrl);
		}

		throw error(401, 'Invalid password');
	}
};
