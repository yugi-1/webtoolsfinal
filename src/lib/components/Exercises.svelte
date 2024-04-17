<script>
import { fly, slide } from 'svelte/transition';
import { apiData, quotes, theData } from '../store';
import { fade } from 'svelte/transition';

import { readable } from 'svelte/store'
	import { tweened } from 'svelte/motion'
	import { onMount } from 'svelte'



    const mstime = readable(new Date().getTime(), set => {
		let animationFrame
		const next = () => {
			set(new Date().getTime())
			animationFrame = requestAnimationFrame(next)
		}
		if (window.requestAnimationFrame) {
			next()
			return () => cancelAnimationFrame(animationFrame)
		}
	})
	let start
	onMount(() => {
		start = new Date().getTime()
	})
    $: time = Math.floor(($mstime - start) / 1000)
	$: toWait = timer - time > 0 ? timer - time : 0
	$: minutes = Math.floor(toWait/60)
	$: seconds = toWait - minutes * 60

    const progress = tweened(0, { duration: 1000 })
	$: {
		$progress = 1 - (toWait / timer)
	}
    
    

let exercises = [
		{
			id: 6,
			title: '2 Minute Breathing Exercise',
			length: '2 min',
            duration: 2,
            completed: false,
            favorited: false,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 2 minutes"

		},
		{
			id: 2,
			title: '5 Minute Meditation',
			length: '5 min',
            duration: 5,
            favorited: true,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 5 minutes"

		},
        {
			id: 5,
			title: '10 Minute Meditation',
			length: '10 min',
            duration: 10,
            completed: false,
            favorited: false,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 10 minutes"

		},
        {
			id: 2234,
			title: 'Full hour relaxation',
			length: '1 hr',
            duration: 60,
            completed: false,
            favorited: true,
            instructions: "Find a quiet area and sit down criss cross. Optionally turn on some white noise. Close your eyes, and take 10 deep breaths. In between let go of all your worries, and repeat for 1 hour"

		},
	]


let exerciseMode = false;

let timer = 10 * 60; // seconds


// function editEntry(item) {
// 		if (item.entry === '') return
//       	editing = null;
// 		console.log(entries);
// 	}
//     function editMode(id) {
//       	editing = id;
// 		  return editing;
// }
function beginExercise(duration) {
    exerciseMode = true;
    console.log(duration)
    timer = duration * 60;
}

function removeExercise(id) {
		exercises.splice(id, 1)
		exercises = exercises;
		console.log(exercises);
}

async function load() {     
  		await fetch(`https://api.api-ninjas.com/v1/quotes?category=inspirational`, {
            headers: { 'X-Api-Key': 'k5SO+Z7sAVBmJagKDHQJsA==zNMpBYnWhuIgaZZd'},
          })
  		.then(response => response.json())
  		.then(anydata => {
		console.log(anydata);
    	theData.set(anydata.map((q) => {
            return {
                quote: q.quote
            }
        })); 
  		})
};
function filterFavorites() {
		exercises = exercises.filter(exercise => exercise.favorited === true);
		console.log(exercises.length);
    }


function cancelExercise() {
    exerciseMode = false;
}
</script>


<div class="text-center">

<button type="button" class="btn variant-filled m-2" on:click={load}>Get Inspirational Quote</button>

<div>
<button type="button" class="btn btn-sm variant-filled m-2" on:click={filterFavorites}>View Favorites</button>
</div>

{#each $theData as { quote } }
    <p class="p-5 h6" transition:fade={{ delay: 250, duration: 300 }}>{@html quote}</p>
{/each}

{#each exercises as exercise}
{#if exerciseMode === false} 

<div class="card variant-filled p-10 m-10">
    
    <h1>{exercise.title}</h1>
    <p>{exercise.length}</p>


    {#if exercise.completed === true}
        <button type="submit" class="btn variant-filled-surface m-2" on:click={beginExercise}>Begin Again</button>
    {:else}
        <button type="submit" class="btn variant-filled-surface m-2" on:click={() => beginExercise(exercise.duration)}>Begin</button>
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


{#if exerciseMode === true} 

<section class="app">
	<svg viewBox="0 0 10 10" style="background: hsl({120 * (1-$progress)}deg, 50%, {100 - 50 * $progress}%)" preserveAspectRatio="none">
		<rect
			y={10 * $progress}
			width=10
			height={10 * (1-$progress)}
			fill="hsl({120 * (1-$progress)}deg, 50%, 50%)"
		/>
	</svg>
	<div class="timer-value">
		<span>{minutes}mins</span>
		<small>{seconds}s</small>
	</div>
</section>

<button type="button" class="btn variant-filled m-10" on:click={cancelExercise}>Complete</button>
{/if}

</div>
<style>
.app {
    margin-top: 20px;
}
  .timer-value {
    position: absolute;
    display: flex;
    mix-blend-mode: difference;
    color: rgb(12, 41, 136);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 54px;
    font-size: 94px;
    bottom: 250px;
    left: 140px;

  }
  .timer-value small {
    font-size: 18px;
  }
</style>