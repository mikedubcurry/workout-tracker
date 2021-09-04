<script lang="ts">
	export let text: string;
	export let action: (e: Event) => void;
	export let btnType: 'primary' | 'secondary' | 'accent';
	export let submit = false;

	let style = '';
	switch (btnType) {
		case 'primary':
			style = 'background-color: var(--primary-color, #c6e0ff); color: var(--dark-color, #315659);';
			break;
		case 'secondary':
			style =
				'background-color: var(--secondary-color, #bcab79); color: var(--darker-color, #315659);';
			break;
		case 'accent':
			style = 'background-color: var(--accent-color, #2978a0); color: var(--light-color, #253031);';
			break;
	}
</script>

<button type={submit ? 'submit' : 'button'} {style} on:click={action}>{text}</button>

<style>
	button {
		padding: 8px 16px;
		border-radius: 16px;
		border: none;
		font-weight: bold;
		transition: filter 0.3s ease;
		cursor: pointer;
	}

	button:hover,
	button:focus {
		filter: brightness(110%);
	}

	button:active {
		filter: brightness(90%);
	}
</style>
