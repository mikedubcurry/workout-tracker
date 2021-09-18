<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '../lib/actions/form';
	import Dialog from './Dialog.svelte';
	import WorkoutItem from './WorkoutItem.svelte';
	import { formatDate } from './utils';

	let today = new Date();
	let date: string = formatDate(today);
	let intensity = 5;
	let exercisePickerVisible = false;
	let exercises = [];

	let workouts = [];

	onMount(async () => {
		try {
			const response = await fetch('/exercises');
			const data = await response.json();
			exercises = data;
		} catch (e) {
			// handle fetch exercise error
			console.log(e);
		}
		try {
			const response = await fetch('/workouts');
			const data = await response.json();
			workouts = data;
		} catch (e) {
			// handle fetch workouts error
			console.log(e);
		}
	});
</script>

<section>
	<ul>
		{#each workouts as workout (workout.id)}
			<!-- create workout item component -->
			<li><WorkoutItem {workout} /></li>
		{/each}
	</ul>
	<form
		action="/workouts"
		method="post"
		use:enhance={{
			result: async (res, form) => {
				form.reset();
				window.location.reload();
			},
			error: async (res, err, form) => {
				if (res.status === 400) {
					console.log('must include both date and intensity');
				}
			}
		}}
	>
		<label for="date">
			<span>Date:</span>
			<input type="date" name="date" id="date" bind:value={date} />
		</label>
		<label for="intensity">
			<span>Intensity:</span>
			<input type="range" min="0" max="10" bind:value={intensity} name="intensity" id="intensity" />
		</label>
		<button>Add Exercises</button>
	</form>
	<!-- {#if exercisePickerVisible}
		<Dialog width={500} height={700} on:dialogClose={() => (exercisePickerVisible = false)}>
			<div class="exercisePicker">
				<ul>
					{#each exercises as exercise (exercise.id)}
						<li>{exercise.name} - {exercise.muscleGroup}</li>
					{/each}
					<li>
						<button
							on:click={() => {
								console.log('opening exercise creation form');
							}}>New Exercise</button
						>
					</li>
				</ul>
				<button on:click={() => (exercisePickerVisible = false)}>Close</button>
			</div>
		</Dialog>
	{/if} -->
</section>
