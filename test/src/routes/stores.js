import { writable } from 'svelte/store';

export const equipmentStore = writable(['Slot1', 'Slot2', 'Slot3', 'Slot4', 'Slot5', 'Slot6', 'Slot7', 'Slot8', 'Slot9']);

let character = {
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: [],
  money: 0
};

export const myCharacter = writable(character);

export function updateGridItems() {
  for (let i = 0; i < equipmentSlot.length; i++) {
    const gridItem = document.getElementById(`equipmentSlot-${i}`);
    gridItem.textContent = equipmentSlot[i];
  }
}

export const arcanaStore = writable(['Slot1', 'Slot2', 'Slot3', 'Slot4']);

export function updateArcana() {
  for (let i = 0; i < arcanaSlot.length; i++) {
    const gridItem = document.getElementById(`arcanaSlot-${i}`);
    gridItem.textContent = arcanaSlot[i].name;
  }
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

export function getStarterPackage() {
  let i = getRandomInt(3);
  let j = getRandomInt(6);
  let equipment = starterPackages[i][j];
  for (let k=0; k<equipmentSlot.length; k++) {
    // Check for arcana.
    if (equipment[k] == 'Arcanum') {
      arcanaSlot[0] = getArcana();
      updateArcana();
    } else {
      equipmentSlot[k] = equipment[k];
    }
  }
  console.log('get Starter package called ', equipmentSlot);

  updateGridItems();
  equipmentStore.subscribe(value => {
    console.log(value);
  });
  return starterPackages[i][j];
}

export function makeCharacter(character) {
  character.str = getRandom3d6();
  character.dex = getRandom3d6();
  character.wil = getRandom3d6();
  character.hp = getRandomInt(6) + 1;
  character.money = 0
  console.log('Make character called', myCharacter);
  updateAbilities(character);
}

let starterPackages = [[['Sword', 'Pistol', 'Armour', 'Sense nearby unearthly beings'],
['Musket', 'Sword', 'Flashbang', 'Sense nearby Arcana'],
['Musket', 'Club', 'Immunity to extreme heat and cold'],
['Pistol', 'Knife', 'Telepathy if target fails WIL save'],
['Blunderbuss', 'Hatchet', 'Mutt', 'Dreams show your undiscovered surroundings'],
['Musket', 'Hatchet', 'Flashbang', 'Arcanum', 'Iron Limb']],
[['Rifle', 'Bayonet', 'Lighter Boy', 'Arcanum'],
['Musket', 'Hatchet', 'Hawk', 'Arcanum'],
['Musket', 'Protective Gloves', 'Arcanum'],
['Claymore', 'Acid Flask', 'Acid Flask', 'Arcanum'],
['Pistol', 'Pistol', 'Steel wire', 'Grappling Hook', 'Arcanum'],
['Rifle', 'Mace', 'Eagle', 'Poison']],
[['Rifle', 'Armour', 'Hound', 'Arcanum'],
['Hatchet', 'Pistol', 'Bolt-cutters', 'Arcanum'],
['Musket', 'Mallet', 'Marbles', 'Fancy Hat', 'Arcanum'],
['Musket', 'Bayonet', 'Mutt with telepathic link'],
['Machete', 'Pistol', 'Pistol', 'Talking Parrot', 'Never Sleep'],
['Club', 'Bomb', 'Bomb', 'Bomb', 'Rocket', 'Darkvision']],
[['Club', 'Throwing Knife', 'Throwing Knife', 'Throwing Knife', 'Throwing Knife', 'Arcanum'],
['Musket', 'Mule', 'Arcanum'],
['Pick-Axe', 'Manacle', 'Arcanum'],
['Pistol', 'Rocket', 'Toxin-Immune'],
['Harpoon Gun', 'Baton', 'Acid', 'Slightly Magnetic'],
['Maul', 'Dagger', 'Chain']]]

const equipmentSlot = ['', '', '', '', '', '', '', '', ''];

const arcanum = [
  {name: 'Gatekeeper\’s Sigil', description: 'Create a gate between two flat surfaces that you can see. The gates close if you pass through or break line of sight.'},
  {name: 'Pierced Heart', description: 'State an object you desire. The heart indicates its direction and vague distance.'},
  {name: 'Pale Flame', description: 'An object you touch glows with white light. Contact with the glowing object causes a chilling pain. The effect wears off when the Arcanum is used again.'},
  {name: 'Soul Chain', description: 'Target must pass a deX Save to avoid your touch, or they lose d6 WIL and you get a glimpse of their current desire.'},
  {name: 'Gavel of the Unbreakable Seal', description: 'One door, window, etc. is sealed until you open it.'},
  {name: 'Foul Censer', description: 'Green smoke surrounds you and everyone within 20ft. Missiles cannot pass through the smoke.'},
  {name: 'Bleeding Stave', description: 'Spews blood-like oil onto a 10ft area. Anyone moving or standing on the oil must make a deX Save to avoid falling and being unable to move on their turn. Disappears in a harmless flash if ignited.'}
]

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

