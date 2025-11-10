import type { Actions, PageServerLoad } from './$types.ts';
import { formSchema } from '$lib/components/form/schema/schema.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod, zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
