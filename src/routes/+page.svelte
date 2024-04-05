<script>

// for mood selection create radio buttons when user clicks 
// mood tracker option with different material ui icons and values representing 
// the emotion then apply that to data

let newEntry ='';
let newMood ='';

let creatingEntry = false;
let creatingEntryMood = false;
function createEntryMode() {
	creatingEntry = true;
	newEntry =''
		  return creatingEntry;
}
function createEntryMoodMode() {
	creatingEntryMood = true;
	newMood ='';
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

</script>


{#if creatingEntry === true}
<div class="container h-full mx-auto flex justify-center items-center mb-50">
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
			<div>
				<span class="badge bg-surface-600">{@html entry.mood}</span>
				<span class="flex-auto">
					<dt class="font-bold">{entry.id}</dt>
					<dd>{entry.entry}</dd>
				</span>
			</div>
		</dl>
	</div>
</div>
{/each}

{#if entries.length !== 2 && creatingEntry === false}

<div class="flex justify-center bottom-10 sticky">
	<button on:click={createEntryMode} type="button" class=" p-50 btn-icon btn-icon-xl variant-filled">
		<span class="material-symbols-outlined">
			add
			</span>
	</button>
	</div>
{/if}

{/if}



<style lang="postcss">

</style>
