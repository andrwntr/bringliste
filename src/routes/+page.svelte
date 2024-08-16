<script lang="ts">
	import { goto } from '$app/navigation';

	function navigateToCreateList() {
		goto('/liste/erstellen');
	}
</script>

<div class="hero">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Erstelle eine Bringliste</h1>

			<p class="pt-6">
				Du kennst das Problem: Du möchtest eine Party verantstalten und jeder soll etwas mitbringen?
				Aber es gibt kein vernünftiges Tool, um das zu organisieren? Dann bist du hier genau
				richtig! Erstelle eine Bringliste und lade deine Freunde ein, sich einzutragen.
			</p>

			<p class="pb-6 pt-4"><strong>Ohne Anmeldung oder sonstigen Schnickschnack.</strong></p>

			<button class="btn btn-primary btn-lg" on:click={navigateToCreateList}>Liste erstellen</button
			>
		</div>
	</div>
</div>
