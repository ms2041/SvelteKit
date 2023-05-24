import { writable } from 'svelte/store';
import { items } from '../oddpendium';

// Writable store instance for the modal
export const modal = writable(false);

// Writable store that is mapped to the list of categories.
export const gridItemCategory = writable(['', '', '', '', '', '', '', '']);

// Writable store that is mapped to the list of names.
export const gridItemName = writable(['', '', '', '', '', '', '', '']);

export function showModal() {
  console.log('Show Modal');
  modal.set(true);
  let categories = extractCategories(items);
  gridItemCategory.set(categories)
  // Extra code here.
}

export function hideModal() {
  console.log('Hide Modal');
  modal.set(false);
  // Extra code here.
}

export function extractCategories(items) {
  const categories = [];
  
  for (const item of items) {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  }
  console.log('Extracted item categories: ', categories);
  return categories;
}

export function displayItemName(category) {
  const itemArray = [];
  for (const item of items) {
    if (item.category == category) {
      if (item.selection.length > 1) {
        for (let i=0; i< item.selection.length; i++) {
          itemArray.push(item.selection[i].name);
        }
      } else {
        itemArray.push(item.selection[0]);
      }
    } 
  }
  console.log('displayyItemName ', category, itemArray);
  gridItemName.set(itemArray);
  return(itemArray);
}