import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const externalID = params.externalID;

	const list = await prisma.bringList.findFirst({
		where: { externalId: externalID }
	});

	if (!list) {
		return new Response(JSON.stringify(list), {
			headers: { 'Content-Type': 'application/json' },
			status: 404,
			statusText: 'NOT FOUND'
		});
	}

	const listItems = await prisma.listItem.findMany({ where: { listId: list.id } });

	return new Response(JSON.stringify({ list, listItems }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		statusText: 'OK'
	});
};
