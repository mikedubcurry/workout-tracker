<script>
	import Button from './controls/Button.svelte';

	let loggedIn = false;
	// TODO: implement Auth flow
</script>

<div class="authBtns">
	{#if loggedIn}
		<Button btnType="secondary" text="Log Out" action={() => (loggedIn = false)}>Log Out</Button>
	{:else}
		<Button btnType="accent" text="Sign Up" action={() => (loggedIn = true)}>Sign Up</Button>
		<Button btnType="secondary" text="Log In" action={() => (loggedIn = true)}>Log In</Button>
	{/if}
</div>

<style>
	.authBtns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		margin: 0 14px;
	}
</style>
