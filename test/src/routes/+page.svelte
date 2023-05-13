<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { equipmentStore, myplayer, makeplayer} from './stores';

  let hp = 0;
  let inventory = []

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onMount(() => {
    makeplayer(myplayer);
  });

</script>
