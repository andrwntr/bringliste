<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import 'tailwindcss/tailwind.css';
	import '../global.scss';

	let currentTheme = '';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const theme = window.localStorage.getItem('theme') || 'fantasy';
			document.documentElement.setAttribute('data-theme', theme);
			currentTheme = theme;
		}
	});

	function switchTheme(event: Event) {
		const theme = currentTheme === 'fantasy' ? 'sunset' : 'fantasy';
		window.localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		currentTheme = theme;
	}
</script>

<div class="grid h-screen">
	<div class="navbar bg-base-300">
		<nav class="flex-1">
			<a class="btn btn-ghost text-xl" href="/">Bringliste</a>
		</nav>
		<div class="flex-none">
			<button class="btn btn-neutral" on:click={switchTheme}>
				{#if currentTheme === 'fantasy'}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</button>
		</div>
	</div>
	<div class="content p-4 flex flex-col items-center">
		<slot />
	</div>
	<footer class="footer bg-neutral text-neutral-content p-4">
		<nav>
			<a class="link link-hover" href="/datenschutz">Datenschutz</a>
		</nav>
	</footer>
</div>

<style lang="scss">
	.grid {
		grid-template-rows: auto 1fr auto;
	}
</style>
