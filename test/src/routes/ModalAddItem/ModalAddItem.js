import { writable } from 'svelte/store';

// Create a writable store instance for the modal
export const modal = writable(false);

export function showModal() {
  console.log('Show Modal');
  modal.set(true);
  // Extra code here.
}

export function hideModal() {
  console.log('Hide Modal');
  modal.set(false);
  // Extra code here.
}