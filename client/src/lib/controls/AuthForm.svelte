<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import { portal } from '$lib/actions/portal';
	import Button from './Button.svelte';
	import Dialog from '../Dialog.svelte';
	import { enhance } from '$lib/actions/form';

	export let type: 'Log In' | 'Sign Up';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';

	let action = type === 'Log In' ? '/login' : '/signup';

	let input: HTMLInputElement;

	onMount(() => {
		input.focus();
	});
</script>

<Dialog on:dialogClose={() => dispatch('formClose')}>
<form
	use:enhance={{
		result: async (res, form) => {
			form.reset();
			dispatch('formSubmit');
			window.location.reload();
		},
		pending: (data, form) => {
			// TODO: add pending state
		},
		error: async (res, err, form) => {
			if (err) {
				console.error(err);
			} else {
				console.error(await res.json());
			}
			form.reset();
			input.focus();
		}
	}}
	{action}
	method="post"
	transition:fly={{ y: 100, duration: 300 }}
>
	<label for="email"
		><span>Email:</span>
		<input bind:this={input} type="text" name="email" id="email" required bind:value={email} />
	</label>
	<label for="password"
		><span>Password:</span><input
			name="password"
			id="password"
			required
			type="password"
			bind:value={password}
		/></label
	>
	<Button btnType={type === 'Log In' ? 'secondary' : 'accent'} text={type} submit={true} />
	<Button
		btnType="secondary"
		text="Close"
		action={(e) => {
			e.preventDefault();
			dispatch('formClose');
		}}
	/>
</form>
</Dialog>
<!-- <div
	on:click={() => {
		dispatch('formClose');
	}}
	transition:fade
	class="bgOverlay"
/> -->

<style>
	form {
		z-index: 11;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		background-color: var(--primary-color);
		left: calc(50% - 150px);
		width: 300px;
		height: 300px;
		padding: 24px;
		border-radius: 24px;
		font-family: Arial, Helvetica, sans-serif;
	}

	input {
		padding: 4px 8px;
		border-radius: 4px;
		border: none;
	}

	label {
		display: flex;
		flex-direction: column;
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
</style>
