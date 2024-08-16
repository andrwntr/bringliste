<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ListItem } from '$lib/models';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { CircleX, Copy, CopyCheck } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = false;
	let listId = 0;
	let externalId = 0;
	let items: ListItem[] = [];
	let currentUrl = '';

	let author = '';
	let itemName = '';
	let copySuccess = false;

	$: sortListItemsByAuthor(data?.data?.listItems);
	$: listId = data?.data?.list?.id;
	$: externalId = data?.data?.list?.externalId;

	onMount(() => {
		currentUrl = window?.location?.href;
	});

	function copyCurrentUrlToClipboard() {
		navigator.clipboard
			.writeText(currentUrl)
			.then(() => {
				copySuccess = true;
				setTimeout(() => {
					copySuccess = false;
				}, 675);
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	}

	function sortListItemsByAuthor(listItems: ListItem[]) {
		listItems.sort((a, b) => {
			if (a.author < b.author) {
				return -1;
			}
			if (a.author > b.author) {
				return 1;
			}
			return 0;
		});
		items = listItems;
	}

	const addListItem: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			author = '';
			itemName = '';
			await update({ reset: false });
		};
	};
</script>

<div class="w-full md:w-3/5">
	<h1 class="text-xl font-bold">{data?.data?.list?.name}</h1>
	{#if data?.data?.list?.description}
		<p class="overflow-wrap break-words break-all whitespace-normal">
			{data?.data?.list.description}
		</p>
	{/if}

	<div class="divider" />

	<h2 class="text-lg font-semibold">Teile den Link mit deinen Freunden</h2>

	<button class="btn btn-primary mt-2" on:click={copyCurrentUrlToClipboard}>
		{#if copySuccess}
			<CopyCheck /> Kopiert
		{:else}
			<Copy /> Kopieren
		{/if}
	</button>

	<div class="divider" />

	<table class="table table-fixed">
		<thead>
			<tr>
				<th>Wer</th>
				<th>Was</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.id)}
				<form id="form-{item.id}" method="POST" action="?/deleteListItem" use:enhance></form>
				<tr>
					<td class="hidden">
						<input form="form-{item.id}" name="id" value={item.id} />
						<input form="form-{item.id}" name="externalId" value={externalId} />
					</td>
					<td>
						<input
							form="form-{item.id}"
							name="author"
							disabled
							readonly
							class="hidden"
							bind:value={item.author}
						/>
						<p class="break-words">{item.author}</p>
					</td>
					<td>
						<input
							form="form-{item.id}"
							name="name"
							disabled
							readonly
							class="hidden"
							bind:value={item.name}
						/>
						<p class="break-words">{item.name}</p>
					</td>
					<td>
						<button form="form-{item.id}" class="btn btn-ghost text-red-600" type="submit">
							<CircleX /> Löschen
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="divider" />

	<form method="POST" action="?/addListItem" use:enhance={addListItem}>
		<input type="text" class="hidden" name="externalId" bind:value={externalId} />
		<input type="text" class="hidden" name="listId" bind:value={listId} />

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Dein Name</span>
			</div>
			<input type="text" name="author" class="input input-bordered w-full" bind:value={author} />
		</label>

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Was bringst du mit?</span>
			</div>
			<input
				type="text"
				name="itemName"
				class="input input-bordered w-full"
				bind:value={itemName}
			/>
		</label>

		{#if loading}
			<button type="submit" class="btn btn-primary w-full mt-6">
				<span class="loading loading-dots loading-md"></span>
			</button>
		{:else}
			<button type="submit" class="btn btn-primary w-full mt-6">Hinzufügen</button>
		{/if}
	</form>
</div>
