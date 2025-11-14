import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const { folderId, linkId } = params;

	return new Response('OK', { status: 200 });
};
