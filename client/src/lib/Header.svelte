<script>
	import AuthBtns from './AuthBtns.svelte';
</script>

<header>
	<h1><a href="/">Gym Stats</a></h1>

	<AuthBtns />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
    align-items: center;
		background-color: var(--primary-color, #c6e0ff);
    height: 10vh;
	}
  h1 {
    margin-inline-start: 14px;
  }
  a {
    text-decoration: none;
    color: var(--darker-color, #253031)
  }
  a:hover, a:focus {
    color: var(--dark-color)
  }
</style>
