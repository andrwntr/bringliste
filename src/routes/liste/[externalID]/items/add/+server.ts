import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const requestData = await request.json();

	const listItem = await prisma.listItem.create({
		data: {
			author: requestData.author,
			name: requestData.itemName,
			list: {
				connect: {
					id: +requestData.listId
				}
			}
		}
	});

	return new Response(JSON.stringify(listItem), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 201,
		statusText: 'Created'
	});
};
