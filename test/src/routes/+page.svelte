<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { createPlayer} from './stores';

  let hp = 0;
  let inventory = []

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onMount(() => {
    createPlayer(); // Generate a random player on start up.
  });

</script>
