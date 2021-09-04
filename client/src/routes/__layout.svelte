<script>
	import Header from '$lib/Header.svelte';
</script>

<Header />
<main>
	<slot />
</main>

<style>
	main {
		width: 100vw;
		/* min-height: 100vh; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>
