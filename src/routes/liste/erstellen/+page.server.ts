import { prisma } from '$lib/prisma.js';
import { fail } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const prerender = false;

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const description = formData.get('description')?.toString();

		if (!name) {
			return fail(400, { message: 'Es muss ein Name zum Erstellen der Liste angegeben werden.' });
		}

		const externalId = uuid();

		const list = await prisma.bringList.create({
			data: {
				name,
				description,
				externalId
			}
		});

		return { success: true, message: 'Die Liste wurde erfolgreich erstellt.', data: list };
	}
};
