<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { equipmentStore, getStarterPackage, updateGridItems, myCharacter, makeCharacter} from './stores';

  let hp = 0;
  let inventory = []
  let starterPackage = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onMount(() => {
    updateGridItems();
    makeCharacter(myCharacter);
});

</script>
