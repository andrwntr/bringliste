<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;
	let loading = false;

	$: if (form?.success) {
		goto(`/liste/${form?.data?.externalId}`);
	}

	const createList: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<div class="w-full md:w-3/5">
	<form method="POST" use:enhance={createList}>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Name der Liste</span>
			</div>
			<input type="text" name="name" class="input input-bordered w-full" />
		</label>

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Beschreibung</span>
			</div>
			<textarea name="description" class="textarea textarea-bordered h-24 w-full"></textarea>
		</label>

		{#if loading}
			<button type="submit" class="btn btn-primary w-full mt-6">
				<span class="loading loading-dots loading-md"></span>
			</button>
		{:else}
			<button type="submit" class="btn btn-primary w-full mt-6">Erstellen</button>
		{/if}
	</form>
</div>
