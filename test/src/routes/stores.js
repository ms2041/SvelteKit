// This file contains data that can be shared by other components in the app.

import { writable } from 'svelte/store';
import { starterPackages, arcanum, names, companionNames } from './oddpendium.js';
import { showModal, hideModal, resetModal } from './Modal/Modal.js';

// gridItems are stat stores that are mapped to divs in +layout.svelte.
export const title = writable('INTO THE ODD');
export const playerName = writable('');
export const gridItemStr = writable(0);
export const gridItemDex = writable(0);
export const gridItemWil = writable(0);
export const gridItemHp = writable(0);
export const gridItemEquipment = writable(['', '', '', '', '', '', '', '', '', '', '', '']);
export const gridItemCompanion = writable('');
export const gridItemSpecialInformation = writable('');
export const gridItemShillings = writable(0);
export const gridItemPennies = writable(0);
export const gridItemGuilders = writable(0);

// Define player record.
let player = {
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: ['', '', '', '', '', '', '', '', '', '', '', ''],
  equipmentPtr: 0,
  companion: '',
  specialInformation: '',
  shillings: 0,
  pennies: 0,
  guilders:0
};

/*
An item which can be any object that can be picked up.
Once picked up, items become equipment.
Categories are: Crude Weapon, Hand Weapon, Field Weapon, Noble Weapon, Heavy Gun, Modern Armour
Crude Armour, Shield, Explosive, Medicine, Chemical.
*/
let item = {
  name: '',
  bulky: Boolean,
  category: 'normal',
  number: 0,
  description: '',
  damage: 0,
  armour: 0,
  cost: 0
}

// Random number functions.

function getRandomInt(max) {  
  return Math.floor(Math.random() * max);
}

function getRandom3d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
}
// Ability functions.

export function modifyAbility(ability, value) {
  switch (ability) {
    case 'str':
      if ((player.str + value) >= 0) {
        player.str = player.str + value;
      } else {
        player.str = 0;
      }
      break;
    case 'dex':
      if ((player.dex + value) >= 0) {
        player.dex = player.dex + value;
      } else {
        player.dex = 0;
      }
      break;
    case 'wil':
      if ((player.wil + value) >= 0) {
        player.wil = player.wil + value;
      } else {
        player.wil = 0;
      }
      break;
    case 'hp':
      if ((player.hp + value) >= 0) {
        player.hp = player.hp + value;
      } else {
        player.hp = 0;
      }
      break;
  }
  updateAbilities(player);
}


export function updateAbilities(player) {
  gridItemStr.set(player.str);
  gridItemDex.set(player.dex);
  gridItemWil.set(player.wil);
  gridItemHp.set(player.hp);
  console.log('Update abilities:', player);
}

export function getHighestAbility(player) {
  const { str, dex, wil } = player;
  return Math.max(str, dex, wil);
}

// Money functions.

export function modifyMoney(denomination, value) {
  switch (denomination) {
    case 'shillings':
      player.shillings = player.shillings + value;
      break;
    case 'pennies':
      player.pennies = player.pennies + value;
      break;
    case 'guilders':
      player.guilders = player.guilders + value;
      break;
  }
  updateMoney(player);
}

export function updateMoney(player) {
  gridItemShillings.set(player.shillings);
  gridItemPennies.set(player.pennies);
  gridItemGuilders.set(player.guilders);
  console.log('Update money: ', player.shillings, player.pennies, player.guilders)
}

// Equipment functions.

function reorderEquipment() {
  for (let i = player.equipment.length - 1; i >= 0; i--) {
    if (player.equipment[i] === undefined || player.equipment[i] === null || player.equipment[i] === "") {
      player.equipment.splice(i, 1);
    }
  }
  console.log('reorderEquipment ', player.equipment, player.equipment.length);
}
export function removeEquipment(slot) {
  console.log('Remove equipment from slot ', slot);
  player.equipment[slot] = null;
  player.equipmentPtr = player.equipmentPtr - 1;
  reorderEquipment();
  updateEquipment(player);
}

export function displayItemModal(slot) {
  console.log('Add equipment to slot ', slot, player.equipment);
  if ((player.equipment[slot] == null) || (player.equipment[slot] == '')) {
    resetModal();
    showModal();
  } else {
    console.log('Equipment already in slot ', slot);
  }
  reorderEquipment();
  updateEquipment(player);
  console.log('Equipment slots shifted ', slot, player.equipment);
}

export function addItem(item) {
  // Find first empty slot
  player.equipment[player.equipment.length] = item;
  console.log('addItem ', player.equipment);
  updateEquipment(player);
}

export function updateEquipment(player) {
  // equipmentArray is a temporary variable to hold gridItemEquipment data.
  let equipmentArray = ['','','','','','','','','','','',''];
  for (let i=0; i<equipmentArray.length - 1; i++) {
    // Copy equipment to populate equipmentArray.
    if (player.equipment[i]) {
        equipmentArray[i] = player.equipment[i];
    }
  }
  gridItemEquipment.set(equipmentArray);
}

// Player sheet functions.

export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}

export function updatePlayerName(player) {
  playerName.set(player.name);
}

export function updateCompanion(player) {
  gridItemCompanion.set(player.companion);
}

export function updateSpecialInformation(player) {
  gridItemSpecialInformation.set(player.specialInformation);
}
export function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

export function getStarterPackage(player) {
  console.log('2 starterPackages: ', starterPackages);
  // Choose a starter package and initialise player with equipment.
  let i = player.hp - 1;
  let j = getHighestAbility(player) - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  player.equipmentPtr = selectedPackage.equipment.length
  console.log('Column, Row: ', starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], player.equipmentPtr);

  player.equipment = [...selectedPackage.equipment];
  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    player.equipment[player.equipmentPtr] = selectedArcana.name;
    player.equipmentPtr++;
    console.log('Arcana added ', selectedPackage.equipment, player, ' at ', player.equipmentPtr)
  }
  player.companion = selectedPackage.companion;
  player.specialInformation = selectedPackage.specialInformation;

  console.log('get Starter package called ', player);

  updatePlayerName(player);
  updateEquipment(player);
  updateSpecialInformation(player);
  updateCompanion(player);
  updateMoney(player);

  return starterPackages[i][j];
}

export function createPlayer() {
  console.log('1 starterPackages: ', starterPackages);

  player.name = getPlayerName(player);
  player.str = getRandom3d6();
  player.dex = getRandom3d6();
  player.wil = getRandom3d6();
  player.hp = getRandomInt(6) + 1;
  player.equipment = ['', '', '', '', '', '', '', '', '', '', '', ''];
  player.equipmentPtr = 0;
  player.shillings = 0;
  player.pennies = 0;
  player.guilders = 0;

  console.log('createPlayer called', player);
  updateAbilities(player);
  getStarterPackage(player);
}