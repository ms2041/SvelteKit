// This file contains data that can be shared by other components in the app.

import { writable } from 'svelte/store';
import { starterPackages, arcanum, names, companionNames } from './oddpendium.js';


const maxEquipmentSlots = 9;

// Define equipment store.
export const equipmentStore = writable(['', '', '', '', '', '', '', '', '']);

// Define equipment slots which are mapped to a div element in +layout.svelte.
const equipmentSlot = ['', '', '', '', '', '', '', '', ''];

// gridItems are stat stores that are mapped to divs in +layout.svelte.
export const title = writable('INTO THE ODD');
export const playerName = writable('');
export const gridItemStr = writable(0);
export const gridItemDex = writable(0);
export const gridItemWil = writable(0);
export const gridItemHp = writable(0);
export const gridItemEquipment = writable(['', '', '', '', '', '', '', '', '', '', '', '']);
export const gridItemCompanion = writable('');
export const gridItemShillings = writable(0);
export const gridItemPennies = writable(0);
export const gridItemGuilders = writable(0);

// Define player.
let player = {
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: [],
  arcanum:[],
  companion: '',
  specialInformation: '',
  money: 0
};

/* An item which can be any object that can be picked up.
   Once picked up, items become equipment.*/
let item = {
  name: '',
  bulky: Boolean,
  category: 'normal',
  description: '',
  damage: 0,
  armour: 0,
  cost: 0
}

let emptyEquipmentSlot = {
  equipment: [],
  arcanum: false,
  companion: '',
  specialInformation: ''
};

let emptyArcanaSlot = {
  name: '',
  description: ''
}

export const myplayer = writable(player);

export function updateGridItems() {
  for (let i = 0; i < equipmentSlot.length; i++) {
    gridItemEquipment.set(equipmentSlot[i]);
  }
}

export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}
export function updatePlayerName(player) {
  playerName.set(player.name);
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

export function getStarterPackage(player) {
  let i = player.hp - 1;
  let j = getHighestAbility(player) - 3; // The range of the array is from 3 - 18.
  console.log('Column, Row: ', starterPackages.length, starterPackages[0].length, i, j);
  let inventory = starterPackages[i][j];

  for (let k=0; k<gridItemEquipment.length - 1; k++) {
    // Copy equipment to equipmentSlot.
    if (inventory.equipment[k]) {
      gridItemEquipment[k].set(inventory.equipment[k]);
    } else {
      gridItemEquipment[k].set('');
    }
  }

  if (inventory.arcanum) {
    let i = inventory.equipment.length
    gridItemEquipment[i].set(getArcana());
    console.log('Arcana slot: ', arcanaSlot);
  }

  gridItemCompanion.set(inventory.companion);

  player.specialInformation = inventory.specialInformation;

  console.log('get Starter package called ', inventory);

  updatePlayerName(player);
  updateGridItems();
  updateArcana();

  equipmentStore.subscribe(value => {
    console.log('equipmentStore: ',value);
  });

  return starterPackages[i][j];
}

export function makeplayer(player) {
  player.name = getPlayerName(player);
  player.str = getRandom3d6();
  player.dex = getRandom3d6();
  player.wil = getRandom3d6();
  player.hp = getRandomInt(6) + 1;
  player.money = 0;

  console.log('Make player called', player.name, player);
  updateAbilities(player);
  getStarterPackage(player)
}

export function getArcana() {
  console.log ('getArcana called');
  return (arcanum[getRandomInt(arcanum.length)]);
}

const arcanaSlot = ['', '', '', '']

function getRandomInt(max) {  
  return Math.floor(Math.random() * max);
}

function getRandom3d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
}

