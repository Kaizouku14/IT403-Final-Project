import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ params }) => {
	const { linkId } = params;

	console.log(linkId);

	return {
		linkId
	};
};
