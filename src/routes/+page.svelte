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

// ids should eventually just be the date they were created
let userData = [
	{
	entries: [
		{
			id: 1,
			entry: 'today sucked',
			mood: '❌',
			bookmarked: false,
		},
		{
			id: 4,
			entry: 'today was a really good day',
			mood: '❌',
			bookmarked: true,
		}
	],
	moods: [
		{
			id: 2,
			mood: '❌ bad',
			note: 'bad day'
		},
		{
			id: 3,
			mood: '❌ bad',
			note: 'bad day'
		}
	],
	exercises: [
		{
			id: 6,
			mood: '❌ bad',
			note: 'bad day'
		},
		{
			id: 7,
			bookmarked: true
		}
	],
	}
]




function saveEntry() {
	creatingEntry = false
	let entries =[];
	let moods = [];
	let exercises =[];
	let newEntry = '';

	const id = Date();
	userData = [...userData];
	console.log(userData);
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

			<textarea class=" textarea w-[46rem] p-50" rows="15" placeholder="What you did today" />	
		</label>

		<button type="button" class="btn btn-xl variant-ghost m-5 " on:click={createEntryModeDiscard}>Discard</button>
		<button type="button" class="btn btn-xl variant-filled" on:click={saveEntry}>Save Entry</button>
	</form>
	</div>
</div>


{:else}
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">No entries yet. Create one!</h2>
		<button on:click={createEntryMode} type="button" class="animate-bounce btn-icon btn-icon-xl variant-filled">
			<span class="material-symbols-outlined">
				add
				</span>
		</button>
	</div>
</div>
{/if}

<style lang="postcss">

</style>
