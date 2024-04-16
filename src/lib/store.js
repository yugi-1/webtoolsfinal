import { writable, derived } from 'svelte/store';
export const apiData = writable([]);

export const quotes = derived(apiData, ($apiData) => {
  if ($apiData.quote){
    return $apiData.quote;
  }
  return [];
});

export const theData = writable([]);