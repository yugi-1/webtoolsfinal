<script>
import { fly, slide } from 'svelte/transition';


// for mood selection create radio buttons when user clicks 
// mood tracker option with different material ui icons and values representing 
// the emotion then apply that to data

let newEntry ='';
let newMood = '';

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


let creatingEntry = false;
let creatingEntryMood = false;

function createEntryMode() {
	creatingEntry = true;
	newEntry =''
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

const moods = [
		{
			id: 9,
			mood: '❌ bad',
			note: 'bad day'
		},
		{
			id: 3,
			mood: '❌ bad',
			note: 'bad day'
		}
	]

let exercises = [
		{
			id: 6,
			mood: '❌ bad',
			note: 'bad day'
		},
		{
			id: 7,
			bookmarked: true
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
function removeFromList(id) {
		entries.splice(id, 1)
		entries = entries;
		console.log(entries);
}




</script>


{#if creatingEntry === true}
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
{#if entries.length === 2}
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">

		<h2 class="h2">No entries created yet. Create one!</h2>


		<button on:click={createEntryMode} type="button" class="animate-bounce btn-icon btn-icon-xl variant-filled">
			<span class="material-symbols-outlined">
				add
				</span>
		</button>
	</div>
</div>
{/if}

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
						<input bind:checked={entry.bookmarked} class="checkbox" type="checkbox" />
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

{#if entries.length !== 2 && creatingEntry === false}

<div class="flex justify-center bottom-10 sticky">
	<button on:click={createEntryMode} type="button" class="btn-icon btn-icon-xl variant-filled">
		<span class="material-symbols-outlined">
			add
			</span>
	</button>
	</div>
{/if}

{/if}

<div class="flex justify-left bottom-10 sticky ml-5">
<button type="button" class="hover:animate-spin aboslute btn-icon btn-icon-xl variant-filled m-2">
	<span class=" material-symbols-outlined">sentiment_satisfied</span>
</button>
</div>

<style lang="postcss">

</style>
