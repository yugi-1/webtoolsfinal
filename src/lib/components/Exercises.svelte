<script>
import { fly, slide } from 'svelte/transition';

let exercises = [
		{
			id: 6,
			title: '2 Minute Breathing Exercise',
			length: '2 min',
            completed: false,
            favorited: false,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 2 minutes"

		},
		{
			id: 2,
			title: '5 Minute Meditation',
			length: '5 min',
            favorited: true,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 5 minutes"

		},
        {
			id: 5,
			title: '10 Minute Meditation',
			length: '10 min',
            completed: false,
            favorited: false,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 10 minutes"

		},
        {
			id: 2234,
			title: 'Full hour relaxation',
			length: '1 hr',
            completed: false,
            favorited: true,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 1 hour"

		},
	]

let exerciseMode = false;
function beginExercise() {
    exerciseMode = true;
}

function removeExercise(id) {
		exercises.splice(id, 1)
		exercises = exercises;
		console.log(exercises);
}

</script>

<div class="text-center">

<button type="button" class="btn variant-filled m-2">Get Inspirational Quote</button>

{#each exercises as exercise}
{#if exerciseMode === false} 

<div class="card variant-filled p-10 m-10">
    
    <h1>{exercise.title}</h1>
    <p>{exercise.length}</p>

    {#if exercise.completed === true}
    <button type="button" class="btn variant-filled-surface m-2" on:click={beginExercise}>Begin Again</button>
    {:else}
    <button type="button" class="btn variant-filled-surface m-2" on:click={beginExercise}>Begin</button>
    {/if}

    <div class="m-5 flex ">
	    <input class="checkbox mr-2" type="checkbox" bind:checked={exercise.favorited} />
	    <p>Favorite</p>
    </div>

    <button type="button" class="btn-icon variant-ghost-error" on:click={removeExercise}>
        <span class="material-symbols-outlined">
        delete
        </span>
    </button>
</div>

{/if}


{/each}


<!-- {#if exerciseMode === true} 

    <div in:fly={{ y: 200 }} out:slide>
        <p>starting exercise</p>
        <p>{exercise.instructions}</p>
    </div>

{/if} -->

</div>