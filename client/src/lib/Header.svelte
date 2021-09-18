<script>
	import AuthBtns from './AuthBtns.svelte';
</script>

<header>
	<div class="title">
		<h1><a href="/">Gym Stats</a></h1>
		<p class="slogan">Track your workouts</p>
	</div>
	<AuthBtns />
</header>
<nav>
	<a href="/dashboard">Dashboard</a>
</nav>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: var(--primary-color, #c6e0ff);
		height: 15vh;
	}
	.title {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	a {
		text-decoration: none;
		color: var(--darker-color, #253031);
	}
	a:hover,
	a:focus {
		color: var(--dark-color);
	}
</style>
