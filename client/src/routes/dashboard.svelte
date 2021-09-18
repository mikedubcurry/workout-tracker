<script lang="ts" context="module">
	export const load = ({ session }) => {
		if (!session.user) {
			return {
				redirect: '/',
				status: 302
			};
		} else {
			return {
				status: 200
			};
		}
	};
</script>

<script lang="ts">
	import WorkoutCreation from '$lib/WorkoutCreation.svelte';
</script>

<h2>Dashboard</h2>

<WorkoutCreation />

<section>
	<!-- display list of recent exercises -->
	<!-- form to add new exercise -->
</section>
