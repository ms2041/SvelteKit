import { writable } from 'svelte/store';
import { starterPackages, arcanum, names, companionNames } from './starter-packages.js';


// Define 9 equipment slots in UI.
export const equipmentStore = writable(['', '', '', '', '', '', '', '', '']);

// Define player character.
let character = {
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: [],
  arcanum:[],
  accomplice: '',
  specialInformation: '',
  money: 0
};

let emptyEquipmentSlot = {
  equipment: [],
  arcanum: false,
  accomplice: '',
  specialInformation: ''
};

let emptyArcanaSlot = {
  name: '',
  description: ''
}

export const myCharacter = writable(character);

export function updateGridItems() {
  for (let i = 0; i < equipmentSlot.length; i++) {
    const gridItem = document.getElementById(`equipmentSlot-${i}`);
    gridItem.textContent = equipmentSlot[i];
  }
}

// Define 4 arcanum slots in UI.
export const arcanaStore = writable(['', '', '', '']);

export function updateArcana() {
  for (let i = 0; i < arcanaSlot.length; i++) {
    const gridItem = document.getElementById(`arcanaSlot-${i}`);
    gridItem.textContent = arcanaSlot[i].name;
  }
}

export function updateAccomplice() {
  const gridItem = document.getElementById(`accompliceSlot`);
    gridItem.textContent = accompliceSlot;
}
export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}
export function updatePlayer(character) {
  const playerInfo = document.getElementById(`player`);
  console.log('updatePlayer: ', character.name);
  playerInfo.textContent = character.name;
}

export function updateAbilities(character) {
  const gridItemStr = document.getElementById(`str`);
  gridItemStr.textContent = character.str;
  const gridItemDex = document.getElementById(`dex`);
  gridItemDex.textContent = character.dex;
  const gridItemWil = document.getElementById(`wil`);
  gridItemWil.textContent = character.wil;
  const gridItemHp = document.getElementById(`hp`);
  gridItemHp.textContent = character.hp;
  console.log('Update abilities:', character);
}

export function getHighestAbility(character) {
  const { str, dex, wil } = character;
  return Math.max(str, dex, wil);
}

export function getStarterPackage(character) {
  let i = getRandomInt(6);
  let j = getRandomInt(16);
  i = character.hp - 1;
  j = getHighestAbility(character) - 3; // The range of the array is from 3 - 18.
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

  accompliceSlot = inventory.accomplice;

  character.specialInformation = inventory.specialInformation;

  console.log('get Starter package called ', inventory, equipmentSlot);

  updatePlayer(character);
  updateGridItems();
  updateArcana();
  updateAccomplice();

  equipmentStore.subscribe(value => {
    console.log('equipmentStore: ',value);
  });

  return starterPackages[i][j];
}

export function makeCharacter(character) {
  character.name = getPlayerName(character);
  character.str = getRandom3d6();
  character.dex = getRandom3d6();
  character.wil = getRandom3d6();
  character.hp = getRandomInt(6) + 1;
  character.money = 0;

  console.log('Make character called', character.name, character);
  updateAbilities(character);
  updatePlayer(character)
  getStarterPackage(character)
}

const equipmentSlot = ['', '', '', '', '', '', '', '', ''];

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

