import { writable } from 'svelte/store';
import { items } from '../oddpendium';
import { addItem } from '../stores';

// Writable store instance for the modal.
export const modal = writable(false);

// TRUE if category is clicked.
export const catagorySelected = writable(false);

// TRUE if item is clicked.
export const itemSelected = writable(false);

// Writable store that is mapped to the list of categories divs in the modal.
export const gridItemCategory = writable(['', '', '', '', '', '', '', '']);

// Writable store that is mapped to the list of names divs in the modal.
export const gridItemName = writable(['', '', '', '', '', '', '', '']);

// Writable store that defines whether a label is bolded or not.
export const categoryIsBold = writable([false, false, false, false, false, false, false, false]);
export const itemIsBold = writable([false, false, false, false, false, false, false, false]);

// Selected item for saving, when save key is pressed.
export const selectedItem = writable();

export function showModal() {
  console.log('Show Modal');
  modal.set(true);
  let categories = extractCategories(items);
  gridItemCategory.set(categories)
  // Extra code here.
}

export function hideModal() {
  console.log('Hide Modal');
  resetModal();
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

export function resetModal() {
  categoryIsBold.set([false, false, false, false, false, false, false, false]);
  itemIsBold.set([false, false, false, false, false, false, false, false]);
  catagorySelected.set(false);
  itemSelected.set(false);
  gridItemName.set([false, false, false, false, false, false, false, false]);
  gridItemCategory.set([false, false, false, false, false, false, false, false])
}

export function boldSelectedCategory(index)
{
  console.log('boldSelectedCategory ', index);
  categoryIsBold.update(arr => {
    arr[index] = true; // Set the indexth element to true
    return arr; // Return the updated array
  });
}

export function unboldSelectedCategory(index)
{
  categoryIsBold.update(arr => {
    arr[index] = false; // Set the indexth element to be false.
    console.log('unboldSelectedCategory ', index, arr);
    return arr; // Return the updated array
  });
}

export function boldSelectedItem(index) {
  let itemAlreadySelected;
  itemSelected.subscribe(value => {
    itemAlreadySelected = value;
  });
  if (!itemAlreadySelected) {
    itemIsBold.update(arr => {
      arr[index] = true; // Set the indexth element to true
      console.log('boldSelectedItem ', index, arr);
      return arr; // Return the updated array
  });
}
}

function isItemSelected(index) {
  let selected;
  itemSelected.subscribe(value => {
    selected = value;
    console.log('isItemSelected:', index, selected);
  });
  return(selected);
}

export function unboldSelectedItem(index)
{
  let clicked;
  itemIsBold.subscribe(value => {
    clicked = value;
    console.log('unboldSelectedItem:', index, clicked);
  });

  // Unbold item only if mouse moves off an unclicked item.
  if (!isItemSelected(index)) {
    itemIsBold.update(arr => {
      arr[index] = false; // Set the indexth element to be false.
      return arr; // Return the updated array
    });
  }
}

export function displayItemNames(category, index) {
  // If a category is clicked, all mouseovers+bolds are disabled except for current slot.
  // Dsiplay all items belonging to selected category.
  let clicked;
  catagorySelected.subscribe(value => {
    clicked = value;
    console.log('Current value:', clicked);
  });
  console.log('displayItemName: ', category, index);
  //Dynamically generate a list of items to be displayed.
  const itemArray = [];
  itemSelected.set(false); // Ensure that no item can be inadvertantly added.
  if (!clicked) {
    if (category != '') {
      console.log('Decision here: ', clicked, category);
      boldSelectedCategory(index);
      for (const item of items) {
        if (item.category == category) {
          itemArray.push(item.name);
        } 
      }
    } else {
      // Set itemArray to null if clicked set to false.
      unboldSelectedCategory(index);
      console.log('categoryIsBold set to false ', index);
      if (!clicked) { // Remove item names if clicked == false.
        gridItemName.update(arr => arr.map(() => null));
      }
    }
    console.log('displayItemName ', category, itemArray);
    gridItemName.set(itemArray);
    return(itemArray);
  }
}

export function selectCategory(category) {
  let categoryValue;
  catagorySelected.subscribe(value => {
    categoryValue = value;
    console.log('Current value:', categoryValue);
  });
  if (!categoryValue) {
    catagorySelected.set(true);
    console.log('Set clicked to true');
  } else {
    catagorySelected.set(false);
    console.log('Set clicked to false');
  }
  // Display new value.
  catagorySelected.subscribe(value => {
    console.log('New value:', value);
  });
}

export function selectItem(slot, itemName) {
  console.log('selectItem: ', slot, itemName);
  let itemValue;
  itemSelected.subscribe(value => {
    itemValue = value;
    console.log('Current value:', itemValue);
  });
  if (!itemValue) {
    itemSelected.set(true);
    console.log('Set clicked to true');
  } else {
    itemSelected.set(false);
    console.log('Set clicked to false');
  }
  // Display new value.
  itemSelected.subscribe(value => {
    console.log('New value:', value);
  });

  for (const item of items) {
      if (item.name == itemName) {
        selectedItem.set(item);
        boldSelectedItem(slot);
        console.log('selectItem: Item found', slot, item);
      }
  }
}

export function saveItem() {
  let itemValue;
  itemSelected.subscribe(value => {
    itemValue = value;
    console.log('Current value:', itemValue);
  });

  if (itemValue) {
    let currentValue;
    const unsubscribe = selectedItem.subscribe(value => {
      currentValue = value;
    });
    addItem(currentValue.name);
    console.log('saveItem: ', currentValue)
  }
}