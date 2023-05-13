// This file contains data that can be shared by other components in the app.

import { writable } from 'svelte/store';
import { starterPackages, arcanum, names, companionNames } from './oddpendium.js';


const maxEquipmentSlots = 9;

// Define equipment store.
export const equipmentStore = writable(['', '', '', '', '', '', '', '', '']);

// Define equipment slots which are mapped to a div element in +layout.svelte.
const equipmentSlot = ['', '', '', '', '', '', '', '', ''];

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
    const gridItem = document.getElementById(`equipmentSlot-${i}`);
    gridItem.textContent = equipmentSlot[i];
  }
}

// Define 4 arcanum slots in UI.
export const arcanaStore = writable(['', '', '', '']);

export function updateArcana() {
  const doubleSlot = document.querySelector('arcanaContainer-0');
  for (let i = 0; i < arcanaSlot.length; i++) {
    const gridItem = document.getElementById(`arcanaSlot-${i}`);
    gridItem.textContent = arcanaSlot[i].name;
  }
}

export function updatecompanion() {
  const gridItem = document.getElementById(`companionSlot`);
    gridItem.textContent = companionSlot;
}
export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}
export function updatePlayer(player) {
  const playerInfo = document.getElementById(`player`);
  console.log('updatePlayer: ', player.name);
  playerInfo.textContent = player.name;
}

export function updateAbilities(player) {
  const gridItemStr = document.getElementById(`str`);
  gridItemStr.textContent = player.str;
  const gridItemDex = document.getElementById(`dex`);
  gridItemDex.textContent = player.dex;
  const gridItemWil = document.getElementById(`wil`);
  gridItemWil.textContent = player.wil;
  const gridItemHp = document.getElementById(`hp`);
  gridItemHp.textContent = player.hp;
  console.log('Update abilities:', player);
}

export function getHighestAbility(player) {
  const { str, dex, wil } = player;
  return Math.max(str, dex, wil);
}

export function getStarterPackage(player) {
  let i = getRandomInt(6);
  let j = getRandomInt(16);
  i = player.hp - 1;
  j = getHighestAbility(player) - 3; // The range of the array is from 3 - 18.
  console.log('Column, Row: ', starterPackages.length, starterPackages[0].length, i, j);
  let inventory = starterPackages[i][j];

  // Empty aracanumSlot
  for (i=0; i<arcanaSlot.length; i++) {
    arcanaSlot[i] = emptyArcanaSlot;
  }

  for (let k=0; k<equipmentSlot.length; k++) {
    // Copy equipment to equipmentSlot.
    equipmentSlot[k] = inventory.equipment[k];
  }

  if (inventory.arcanum) {
      arcanaSlot[0] = getArcana();
      console.log('Arcana slot: ', arcanaSlot);
    }

  companionSlot = inventory.companion;

  player.specialInformation = inventory.specialInformation;

  console.log('get Starter package called ', inventory, equipmentSlot);

  updatePlayer(player);
  updateGridItems();
  updateArcana();
  updatecompanion();

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
  updatePlayer(player)
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

