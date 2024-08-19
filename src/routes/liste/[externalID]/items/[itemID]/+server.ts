import { prisma } from '$lib/prisma';
import type { RequestHandler } from './delete/$types';

export const DELETE: RequestHandler = async ({ params, fetch }) => {
	const itemID = params.itemID;
	const externalID = params.externalID;

	const response = await fetch(`/liste/${externalID}/techID`, {
		method: 'GET'
	});

	const { techID } = await response.json();

	const deleted = await prisma.listItem.delete({
		where: {
			id: +itemID
		}
	});

	if (!deleted) {
		return new Response(null, {
			status: 404,
			statusText: 'Not Found'
		});
	}

	return new Response(null, {
		status: 204
	});
};
