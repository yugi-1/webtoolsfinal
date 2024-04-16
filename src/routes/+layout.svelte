<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import {  Modal } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import Exercise from '../lib/components/Exercises.svelte';

	initializeStores();


	const drawerSettings: DrawerSettings = {
	id: 'example-3',
	// Provide your property overrides:
	bgDrawer: 'bg-surface-800 text-primary-100',
	bgBackdrop: 'bg-gradient-to-tr from-primary-500 to-black-500/50',
	width: 'w-[280px] md:w-[480px]',
	padding: 'p-4',
	rounded: 'rounded-xl',
};


	const drawerStore = getDrawerStore();
	
	function drawerOpen(): void {
	drawerStore.open(drawerSettings);

}
function drawerClose(): void {
	drawerStore.close();
}


</script>

<Drawer>
	<div>
	<h3 class="h3 p-5">Meditation and Breathing Exercises</h3>
	</div>
	<Exercise />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1 class=" h1">Moody</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm mr-4" on:click={drawerOpen}>
				<span class="material-symbols-outlined">
					menu
					</span>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
