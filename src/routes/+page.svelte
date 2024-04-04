<script>

let creatingEntry = false;
function createEntryMode() {
	creatingEntry = true;
		  return creatingEntry;
}
function createEntryModeDiscard() {
	creatingEntry = false;
	return creatingEntry;
}

let entries = [
		{
			id: "oct 7",
			entry: 'today sucked',
			mood: '❌',
			bookmarked: false,
		},
		{
			id: 'aug 25',
			entry: 'today was a really good day',
			mood: '❌',
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
let newEntry ='';
let newMood ='';

function saveEntry() {
	creatingEntry = false;
	const id = (new Date()).toLocaleDateString('en-US');
	entries = [...entries, {id: id, entry: newEntry, bookmarked: false}];
	console.log(entries);
}

</script>

{#if creatingEntry === true}
<div class="container h-full mx-auto flex justify-center items-center mb-50">
	<div class="space-y-10 text-center flex flex-col items-center">
	<form >
		<h3 class="flex justify-center items-center text-white pt-8">New Entry</h3>

		<button type="button" class=" btn-icon btn-icon-xl variant-filled m-2">
			<span class=" material-symbols-outlined">sentiment_satisfied</span>
		</button>

		<label class="label">

			<textarea  bind:value={newEntry} class=" textarea w-[46rem] p-50" rows="15" placeholder="What you did today" />	
		</label>

		<button type="button" class="btn btn-xl variant-ghost m-5 " on:click={createEntryModeDiscard}>Discard</button>
		<button type="button" class="btn btn-xl variant-filled" on:click={saveEntry}>Save Entry</button>
	</form>
	</div>
</div>


{:else}
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		{#if entries.length === 2}
		<h2 class="h2">No entries created yet. Create one!</h2>
		{/if}

		<button on:click={createEntryMode} type="button" class="animate-bounce btn-icon btn-icon-xl variant-filled">
			<span class="material-symbols-outlined">
				add
				</span>
		</button>
	</div>
</div>

{#each entries as entry}
<div class="flex justify-center">
	<div class="card w-[46rem] m-5 ">
		<dl class="list-dl">
			<div>
				<span class="badge bg-primary-500">{entry.mood}</span>
				<span class="flex-auto">
					<dt class="font-bold">{entry.id}</dt>
					<dd>{entry.entry}</dd>
				</span>
			</div>
		</dl>
	</div>
</div>
{/each}

{/if}

<style lang="postcss">

</style>
