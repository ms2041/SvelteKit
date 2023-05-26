import { writable } from 'svelte/store';
import { items } from '../oddpendium';
import { addEquipment } from '../stores';

// Writable store instance for the modal
export const modal = writable(false);

// Writable store clicked for the item names
export const clicked = writable(false);

// Writable store that is mapped to the list of categories.
export const gridItemCategory = writable(['', '', '', '', '', '', '', '']);

// Writable store that is mapped to the list of names.
export const gridItemName = writable(['', '', '', '', '', '', '', '']);

// Writable store that is mapped to the list of names.
export const boldCategory = writable([false, false, false, false, false, false, false, false]);
export const boldItem = writable([false, false, false, false, false, false, false, false]);


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

export function boldCategoryField(index)
{
  console.log('boldCategoryField ', index);
  boldCategory.update(arr => {
    arr[index] = true; // Set the indexth element to true
    return arr; // Return the updated array
  });
}

export function unboldCategoryField(index)
{
  console.log('unboldCategoryField ', index);
  boldCategory.update(arr => {
    arr[index] = false; // Set the indexth element to be false.
    return arr; // Return the updated array
  });
}

export function boldItemField(index)
{
  console.log('boldItemField ', index);
  boldItem.update(arr => {
    arr[index] = true; // Set the indexth element to true
    return arr; // Return the updated array
  });
}

export function unboldItemField(index)
{
  console.log('unboldItemField ', index);
  boldItem.update(arr => {
    arr[index] = false; // Set the indexth element to be false.
    return arr; // Return the updated array
  });
}

export function displayItemNames(category, index) {
  // If a category is clicked, all mouseovers+bolds are disabled except for current slot.
  let categoryClicked;
  clicked.subscribe(value => {
    categoryClicked = value;
    console.log('Current value:', categoryClicked);
  });
  console.log('displayItemName: ', category, index);
  const itemArray = [];
  if (!categoryClicked) {
    if (category != '') {
      console.log('Decision here: ',categoryClicked, category);
      boldCategoryField(index);
      for (const item of items) {
        if (item.category == category) {
          if (item.selection.length > 0) {
            // There is more than 1 item per category.
            for (let i=0; i< item.selection.length; i++) {
              itemArray.push(item.selection[i].name);
            }
          } else {
            // There is only 1 item of that category, so push the 0th element.
            itemArray.push(item.selection[0]);
          }
        } 
      }
    } else {
      // Set itemArray to null if clicked set to false.
      unboldCategoryField(index);
      console.log('boldCategory set to false ', index);
      if (!categoryClicked) { // Remove item names if clicked == false.
        gridItemName.update(arr => arr.map(() => null));
      }
    }
    console.log('displayItemName ', category, itemArray);
    gridItemName.set(itemArray);
    return(itemArray);
  }
}

export function toggleClicked(category) {
  let categoryClicked;
  clicked.subscribe(value => {
    categoryClicked = value;
    console.log('Current value:', value, categoryClicked);
  });
  if (!categoryClicked) {
    clicked.set(true);
    console.log('Set clicked to true');
  } else {
    clicked.set(false);
    console.log('Set clicked to false');
  }
  clicked.subscribe(value => {
    console.log('New value:', value);
  });
}

export function selectItem(slot) {
  console.log('selectItem: ', slot);
}