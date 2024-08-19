import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load = (async ({ fetch, params }) => {
	const externalID = params.externalID;
	const response = await fetch(`/liste/${externalID}`, { method: 'GET' });
	const data = await response.json();

	return { data };
}) satisfies PageServerLoad;

export const actions = {
	addListItem: async ({ request, fetch }) => {
		const formData = await request.formData();

		const listId = formData.get('listId');
		const externalId = formData.get('externalId');
		const author = formData.get('author')?.toString();
		const itemName = formData.get('itemName')?.toString();

		if (!author || !itemName) {
			return fail(400, { message: 'Du musst deinen Namen und was du mitbringen willst angeben.' });
		}

		if (!listId || !externalId) {
			return fail(400, { message: 'Die Liste konnte nicht gefunden werden.' });
		}

		const response = await fetch(`/liste/${externalId}/items/add`, {
			method: 'POST',
			body: JSON.stringify({ listId, author, itemName }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.status !== 201) {
			return fail(400, { message: 'Ein Fehler ist beim Anlegen des Items aufgetreten.' });
		}

		return { success: true, message: 'Die Liste wurde erfolgreich aktualisiert.' };
	},
	deleteListItem: async ({ request, fetch }) => {
		const formData = await request.formData();
		const data = formData.getAll('id');
		const itemID = data[0];
		const externalID = formData.get('externalId');

		const response = await fetch(`/liste/${externalID}/items/${itemID}`, {
			method: 'DELETE'
		});

		return { success: true, message: 'Die Liste wurde erfolgreich erstellt.' };
	}
};
