<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { createPlayer} from './stores';

  onMount(() => {
    createPlayer(); // Generate a random player on start up.
  });

</script>
