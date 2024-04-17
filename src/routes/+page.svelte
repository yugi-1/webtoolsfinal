<script>
import { filter } from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
import { fly, slide } from 'svelte/transition';

// for mood selection create radio buttons when user clicks 
// mood tracker option with different material ui icons and values representing 
// the emotion then apply that to data

let newEntry ='';
let newMood = '';
let newMoodOnly = ''
let newNote = '';
let editing = null;


function editMode(id) {
    editing = id;
	return editing;
}
function editEntry(item) {
	if (item.entry === '') return
    editing = null;
	console.log(entries);
}


let creatingMoodEntry = false;
function addMoodEntryMode() {
	creatingMoodEntry = true;
	newMoodOnly ='';
	console.log(moods);
	return creatingMoodEntry;
}

let creatingEntry = false;
let creatingEntryMood = false;

function createEntryMode() {
	creatingEntry = true;
	newEntry =''
	console.log(entries)
		  return creatingEntry;
}
function createEntryMoodMode() {
	creatingEntryMood = true;
	newMood = '';
	return creatingEntry;
}
function createEntryModeDiscard() {
	creatingEntry = false;
	newEntry =''
	return creatingEntry;
}
function filterBookmarked() {
		entries = entries.filter(entry => entry.bookmarked === true);
		console.log(entries.length);
		// tasksRemain = todoList.length;
    }

let entries = [
		{
			id: "oct 7",
			entry: 'today sucked',
			mood: '<span class=" material-symbols-outlined">sentiment_satisfied</span>',
			bookmarked: false,
		},
		{
			id: 'aug 25',
			entry: 'today was a really good day',
			mood: '<span class="material-symbols-outlined">sentiment_very_dissatisfied</span>',
			bookmarked: true,
		}
	]

let moods = [
		{
			id: '9/4/2023 3:30PM',
			mood: '<span class="material-symbols-outlined">mood</span',
			note: 'today was great'
		},
		{
			id: '9/4/2023 12:00PM',
			mood: '<span class="material-symbols-outlined">sick</span>',
			note: 'bad day'
		}
	]




// let entriesArr = userData.map((item) => {
// 		return item.entries;
// })
const moodOptions = [
		{  value: '<span class="material-symbols-outlined">sentiment_satisfied</span>' },
		{  value: '<span class="material-symbols-outlined">mood</span>' },
		{ value: '<span class="material-symbols-outlined">sentiment_dissatisfied</span>' },
		{  value: '<span class="material-symbols-outlined">sentiment_very_satisfied</span>' },
		{  value: '<span class="material-symbols-outlined">sentiment_neutral</span>' },
		{ value: '<span class="material-symbols-outlined">mood_bad</span>' },
		{ value: '<span class="material-symbols-outlined">sentiment_extremely_dissatisfied</span>' },
		{ value: '<span class="material-symbols-outlined">sick</span>' }
	];

function saveEntry() {
	creatingEntry = false;

	let currentdate = new Date(); 
	let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const id = datetime;
	
	entries = [...entries, {id: id, entry: newEntry, mood: newMood, bookmarked: false}];
	console.log(entries);
}


// const freqTable = {};
// moods.forEach((mood) => {
//   freqTable[mood.mood] = freqTable[mood.mood] + 1 || 1;
// });
// const mode = Object.keys(freqTable).reduce((a, b) =>
//   freqTable[a] > freqTable[b] ? a : b
// );
// console.log(mode);
//what da hell is goin on here


function saveMoodEntry() {
	creatingMoodEntry = false;

	let currentdate = new Date(); 
	let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const id = datetime;
	
	moods = [...moods, {id: id, mood: newMoodOnly, note: newNote}];
	newNote ='';
	console.log(moods);
}


function removeFromList(id) {
		entries.splice(id, 1)
		entries = entries;
		console.log(entries);
}

function removeMoodFromList(id) {
		moods.splice(id, 1)
		moods = moods;
		console.log(moods);
}


</script>

<div>
{#if creatingMoodEntry === false && creatingEntry === false}

<div class="text-left p-5 absolute">
	<h2 >Moods</h2>

{#each moods as mood}
	{#if mood.mood !== ''}
	<div>
		<span class="badge bg-secondary-600 mt-2 ">
			{@html mood.mood}
		{#if mood.note}
		<span>{mood.note}</span>
		{/if}

		<button on:click={() => removeMoodFromList(mood.id)} type="button" class="btn-icon btn-icon-sm variant-ghost-error">
			<span class="material-symbols-outlined ">
			delete
			</span>
		</button>
	</span>

	</div>
	<span class="text-[8px] ">{@html mood.id}</span>
	
	{/if}
	
{/each}
</div>
{/if}

{#if creatingMoodEntry === true}
	<div class="text-center items-center mr-20 mt-10" in:fly={{ y: 200 }} out:slide>
		<h2 class="h2">How do you feel?</h2>
		<div class="flex justify-center">
	{#each moodOptions as moodOption}
		<label class="flex items-center p-5">
			<input class="radio m-2" type="radio" bind:group={newMoodOnly} name="radio-direct" value={moodOption.value} /> {@html moodOption.value}
		</label>
	{/each}
		</div>

		<div>
		<input class="input w-96 m-4 text-center" maxlength="20" title="Input (text)" type="text" placeholder="Add Optional Note/Status" bind:value={newNote} />
	</div>

		<button type="button" class="btn-icon variant-filled" on:click={saveMoodEntry} >
			<span class=" material-symbols-outlined">
				save
			</span>
		</button>
	</div>
{/if}

{#if creatingEntry === true && creatingMoodEntry === false}
<div class="container h-full mx-auto flex justify-center items-center mb-50 " in:fly={{ y: 200 }} out:slide>
	<div class="space-y-10 text-center flex flex-col items-center">
	<form >
		<h3 class="flex justify-center items-center text-white pt-8">New Entry</h3>

		<button on:click={createEntryMoodMode} type="button" class=" btn-icon btn-icon-xl variant-filled m-2">
			<span class=" material-symbols-outlined">sentiment_satisfied</span>
		</button>
		
		{#if creatingEntryMood === true}
		<div class="text-center flex items-center">
			{#each moodOptions as moodOption}
		<label class="flex items-center p-5">
		<input class="radio m-2" type="radio" bind:group={newMood} name="radio-direct" value={moodOption.value} /> {@html moodOption.value}
		</label>

{/each}

			</div>
		{/if}

		<label class="label">

			<textarea  bind:value={newEntry} class=" textarea w-[46rem] p-50" rows="15" placeholder="What you did today" />	
		</label>

		<button type="button" class="btn btn-xl variant-ghost m-5 " on:click={createEntryModeDiscard}>Discard</button>
		<button type="button" class="btn btn-xl variant-filled" on:click={saveEntry}>Save Entry</button>
	</form>
	</div>
</div>


{:else}
{#if creatingMoodEntry === false && creatingEntry === false}

<div class="container h-full mx-auto flex justify-center items-center ">
	<div class="space-y-10 text-center flex flex-col items-center">

		<h2 class="h2 mt-20">Add another entry!</h2>

	

		<button on:click={createEntryMode} type="button" class="animate-bounce btn-icon btn-icon-xl variant-filled">
			<span class="material-symbols-outlined">
				add
				</span>
		</button>
	</div>
</div>
{/if}

{#if creatingMoodEntry === false}
<div class="flex justify-center mt-20">
	<button on:click={filterBookmarked} type="button" class="btn variant-filled variant-filled m-10">
		View Bookmarked
	</button>
	</div>
{#each entries as entry}
<div class="flex justify-center">
	<div class="card w-[46rem] m-5 ">
		<dl class="list-dl">
			{#if editing === entry.id}
				<div>
				<textarea class="textarea m-5 w-[38rem]" bind:value={entry.entry} rows="15" placeholder="Edit..." />	
					<button type="button" class="btn-icon variant-filled" on:click={editEntry}>
						<span class=" material-symbols-outlined">
							save
						</span>
					</button>
				</div>
			{:else}
			<div>
				{#if entry.mood !== ''}
				<span class="badge bg-surface-600">{@html entry.mood}</span>
				{/if}
				<span class="flex-auto pl-2">
					<dt class="font-bold">{entry.id}</dt>
					<dd class="">{entry.entry}</dd>
				</span>
				<div>
					<label class="flex items-center space-x-2">
						<input bind:checked={entry.bookmarked} on:click={() => entry.bookmarked = !entry.bookmarked} id="todo-{entry.id}" class="checkbox" type="checkbox" />
						<span class="material-symbols-outlined">
							bookmark
							</span>
					</label>

				<button on:click={editMode(entry.id)} type="button" class="btn-icon variant-ghost-surface">
					<span class="material-symbols-outlined">
						edit
					</span>
				</button>

				<button on:click={() => removeFromList(entry.id)} type="button" class="btn-icon variant-ghost-error">
					<span class="material-symbols-outlined">
					delete
					</span>
				</button>
			</div>
			</div>
			{/if}
		</dl>

	</div>
</div>

{/each}
{/if}

{#if entries.length !== 2 && creatingEntry === false && creatingMoodEntry === false}

<div class="flex justify-center bottom-10 sticky">
	<button on:click={createEntryMode} type="button" class="btn-icon btn-icon-xl variant-filled">
		<span class="material-symbols-outlined">
			add
			</span>
	</button>
	</div>

{/if}
{/if}


{#if creatingMoodEntry === false}

<div class="flex justify-left bottom-10 sticky ml-5">
<button type="button" class="hover:animate-spin aboslute btn-icon btn-icon-xl variant-filled m-2" on:click={addMoodEntryMode}>
	<span class=" material-symbols-outlined">sentiment_satisfied</span>
</button>
</div>
{/if}
</div>

<style lang="postcss">

</style>
