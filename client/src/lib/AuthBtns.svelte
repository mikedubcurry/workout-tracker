<script lang="ts" context="module">
	export const load = ({ session }) => {
		console.log(session);
		return { status: 200 };
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import AuthForm from './controls/AuthForm.svelte';
	import Button from './controls/Button.svelte';

	let loggedIn = $session.user ? true : false;
	let showAuthForm = false;
	let btn: 'Log In' | 'Sign Up';
</script>	

<div class="authBtns">
	{#if showAuthForm}
		<AuthForm
			on:formSubmit={() => {
				showAuthForm = false;
			}}
			on:formClose={() => {
				showAuthForm = false;
			}}
			type={btn}
		/>
	{/if}
	{#if loggedIn}
		<Button
			btnType="secondary"
			text="Log Out"
			action={async () => {
				const response = await fetch('/logout', { method: 'post' });
				showAuthForm = false;
				window.location.reload()
			}}
		/>
	{:else}
		<Button
			btnType="accent"
			text="Sign Up"
			action={() => {
				btn = 'Sign Up';
				showAuthForm = true;
			}}
		/>
		<Button
			btnType="secondary"
			text="Log In"
			action={() => {
				btn = 'Log In';
				showAuthForm = true;
			}}
		/>
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
