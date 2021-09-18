<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import { portal } from '$lib/actions/portal';

	export let width = 300;
	export let height = 300;

	const dispatch = createEventDispatcher();
</script>

<div class="dialog" style={`--width: ${width}px; --height: ${height}px;`} use:portal transition:fly={{ y: 100, duration: 300 }}>
	<slot />
</div>
<div
	on:click={() => {
		dispatch('dialogClose');
	}}
	transition:fade
	class="bgOverlay"
/>

<style>
	.dialog {
		z-index: 11;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		background-color: var(--primary-color);
		left: calc(50% - 95% / 2);
		top: calc(50% - 75% / 2);
		width: 95%;
		/* height: 75%; */
		padding: 24px;
		border-radius: 24px;
		font-family: Arial, Helvetica, sans-serif;
	}
	.bgOverlay {
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		cursor: pointer;
	}
	@media screen and (min-width: 500px) {
		.dialog {
			width: var(--width);
			height: var(--height);
			left: calc(50% - var(--width)/ 2);
			top: calc(50% - var(--height) / 2);

		}
	}
</style>
