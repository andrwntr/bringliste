import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const externalId = params.externalID;

	const list = await prisma.bringList.findFirst({
		where: {
			externalId
		}
	});

	if (!list) {
		return new Response(null, {
			status: 404,
			statusText: 'Not Found'
		});
	}

	return new Response(JSON.stringify({ techID: list.id }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		statusText: 'OK'
	});
};
