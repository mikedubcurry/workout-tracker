<script lang="ts">
	import AuthForm from './controls/AuthForm.svelte';
	import Button from './controls/Button.svelte';

	let loggedIn = false;
	let showAuthForm = false;
	let btn: 'Log In' | 'Sign Up';
	// TODO: implement Auth flow
</script>

<div class="authBtns">
	{#if showAuthForm}
		<AuthForm
			on:formSubmit={() => {
				showAuthForm = false;
				loggedIn = true;
			}}
			on:formClose={() => {
				showAuthForm = false;
			}}
			type={btn}
		/>
	{:else if loggedIn}
		<Button btnType="secondary" text="Log Out" action={() => (loggedIn = false)}>Log Out</Button>
	{:else}
		<Button
			btnType="accent"
			text="Sign Up"
			action={() => {
				// loggedIn = true;
				btn = 'Sign Up';
				showAuthForm = true;
			}}>Sign Up</Button
		>
		<Button
			btnType="secondary"
			text="Log In"
			action={() => {
				// login();
				// loggedIn = true;
				btn = 'Log In';
				showAuthForm = true;
			}}>Log In</Button
		>
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
