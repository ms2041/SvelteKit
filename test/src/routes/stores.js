// This file contains data that can be shared by other components in the app.

import { writable } from 'svelte/store';
import { starterPackages, arcanum, names, companionNames } from './oddpendium.js';

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

// Define player record.
let player = {
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: [],
  companion: '',
  specialInformation: '',
  moneyShillings: 9,
  moneyPennies: 0,
  moneyGuilders:0
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
  description: '',
  damage: 0,
  armour: 0,
  cost: 0
}

function getRandomInt(max) {  
  return Math.floor(Math.random() * max);
}

function getRandom3d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
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

export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}

export function updatePlayerName(player) {
  playerName.set(player.name);
}

export function updateCompanion(player) {
  gridItemCompanion.set(player.companion);
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

export function getArcana() {
  console.log ('getArcana called');
  return (arcanum[getRandomInt(arcanum.length)]);
}

export function updateMoney(player) {
  gridItemShillings.set(player.moneyShillings);
  gridItemPennies.set(player.moneyPennies);
  gridItemGuilders.set(player.moneyGuilders);
  console.log('Update money: ', player.moneyShillings, player.moneyPennies, player.moneyGuilders)
}

export function getStarterPackage(player) {
  // Choose a starter package and initialise player with equipment.
  let i = player.hp - 1;
  let j = getHighestAbility(player) - 3; // The range of the array is from 3 - 18.
  console.log('Column, Row: ', starterPackages.length, starterPackages[0].length, i, j);
  let inventory = starterPackages[i][j];

  player.equipment = inventory.equipment;
  if (inventory.arcanum) {
    player.equipment[inventory.equipment.length] = getArcana().name;
  }
  player.companion = inventory.companion;
  player.specialInformation = inventory.specialInformation;
  player.equipment = inventory.equipment;

  console.log('get Starter package called ', player);

  updatePlayerName(player);
  updateEquipment(player);
  updateCompanion(player);
  updateMoney(player);

  return starterPackages[i][j];
}

export function createPlayer() {
  player.name = getPlayerName(player);
  player.str = getRandom3d6();
  player.dex = getRandom3d6();
  player.wil = getRandom3d6();
  player.hp = getRandomInt(6) + 1;
  player.moneyShillings = 0;
  player.moneyPennies = 0;
  player.moneyGuilders = 0;

  console.log('createPlayer called', player.name, player);
  updateAbilities(player);
  getStarterPackage(player);
}