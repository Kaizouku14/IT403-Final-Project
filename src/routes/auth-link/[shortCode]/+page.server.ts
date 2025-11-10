import type { PageServerLoad, Actions } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { getLink, verifyPassword } from '$lib/helper/helper.ts';

export const load: PageServerLoad = async () => {
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
		console.log(link);
		if (!link) {
			return fail(404, { error: 'Link not found' });
		}

		const isMatch = await verifyPassword(password, link.password!);
		if (isMatch) {
			throw redirect(302, link.destinationUrl);
		}

		return {
			form
		};
	}
};
