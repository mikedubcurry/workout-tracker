<script lang="ts">
	import { portal } from './actions/portal';
	import Button from './controls/Button.svelte';
	import Dialog from './Dialog.svelte';
	import { formatDate } from './utils';

	export let workout: { date: string; intensity: number; id: number };

	let deletePropmtVisible = false;

	const deleteWorkout = async () => {
		let res = await fetch('/workouts', {
			method: 'delete',
			body: JSON.stringify({ workoutId: workout.id }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

    if(res.ok) {
      deletePropmtVisible = false;
      window.location.reload()
    }
	};
</script>

<div class="workout">
	<div>
		<p>{formatDate(workout.date)}</p>
		<p>Intensity: {workout.intensity}</p>
	</div>
	<div on:click={() => (deletePropmtVisible = true)} class="delete">X</div>
</div>
{#if deletePropmtVisible}
	<Dialog>
		<p>Are you sure you want to delete this workout?</p>
		<Button text="Delete" btnType="accent" action={deleteWorkout} />
		<Button text="Cancel" btnType="secondary" action={() => (deletePropmtVisible = false)} />
	</Dialog>
{/if}

<style>
	.workout {
		background-color: var(--accent-color);
		margin-bottom: 2rem;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		color: var(--light-color);
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1rem;
		display: flex;
		justify-content: space-between;
	}

	.delete {
		visibility: hidden;
		opacity: 0;
		align-self: center;
		margin-right: 2rem;
		transition: opacity 0.3s ease;
		cursor: pointer;
	}

	.workout:hover .delete {
		visibility: visible;
		opacity: 1;
	}
</style>
