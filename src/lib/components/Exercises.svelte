<script>

let exercises = [
		{
			id: 6,
			title: '2 Minute Breathing Exercise',
			length: '2 min',
            completed: false,
            favorited: false

		},
		{
			id: 2,
			title: '5 Minute Meditation',
			length: '5 min',
            favorited: true

		},
        {
			id: 5,
			title: '10 Minute Meditation',
			length: '10 min',
            completed: false,
            favorited: false

		},
        {
			id: 2234,
			title: 'Full hour relaxation',
			length: '1 hr',
            completed: false,
            favorited: true

		},
	]

let exerciseMode = null;
function beginExercise() {

}

</script>

<div class="text-center">

{#each exercises as exercise}
<div class="card variant-filled p-10 m-10">
    
    <h1>{exercise.title}</h1>
    <p>{exercise.length}</p>

    {#if exercise.completed === true}
    <button type="button" class="btn variant-filled m-2">Begin Again</button>
    {:else}
    <button type="button" class="btn variant-filled m-2">Begin</button>
    {/if}

    <div class="m-5 flex ">
	    <input class="checkbox mr-2" type="checkbox" bind:checked={exercise.favorited} />
	    <p>Favorite</p>
    </div>

    <button type="button" class="btn-icon variant-ghost-error">
        <span class="material-symbols-outlined">
        delete
        </span>
    </button>
</div>
{/each}
</div>