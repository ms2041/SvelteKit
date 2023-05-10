<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { equipmentStore } from './stores';

  let hp = 0;
  let inventory = []
  let starterPackage = [];
  let character = {str: '13',
                   dex: 0,
                   wil: 0,
                   hp: 0,
                   equipment: [],
                   money: 0};
  let myCharacter = character;

  const equipmentSlot = ["", "", "", "", "", "", "", "", ""];

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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandom3d6() {
    return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
  }

  function updateGridItems() {
    for (let i = 0; i < equipmentSlot.length; i++) {
      const gridItem = document.getElementById(`equipmentSlot-${i}`);
      gridItem.textContent = equipmentSlot[i];
    }
  }

  function makeCharacter(character) {
    character.str = getRandom3d6();
    character.dex = getRandom3d6();
    character.wil = getRandom3d6();
    character.hp = getRandomInt(6) + 1;
    character.money = 0
    console.log("Make character called", character);
    return character;
  }

  function getStarterPackage() {
    let i = getRandomInt(3);
    let j = getRandomInt(6);
    let equipment = starterPackages[i][j];
    for (let k=0; k<equipmentSlot.length; k++) {
      equipmentSlot[k] = equipment[k];
    }
    console.log("get Starter package called ", equipmentSlot);
    updateGridItems();
    equipmentStore.subscribe(value => {
      console.log(value);
    });
    return starterPackages[i][j];
  }

  onMount(() => {
    updateGridItems();
});


</script>

<button on:click={() => {
  myCharacter = makeCharacter(character);}}>
  Make a character
</button>

<p>
  Player character {myCharacter.str} {myCharacter.dex} {myCharacter.wil} {myCharacter.hp}
</p>

<button on:click={() => {
    starterPackage = getStarterPackage();}}>
  Get Starter Package
</button>
<ul>
  {#each starterPackage as item}
    <li>{item}</li>
  {/each}
</ul>