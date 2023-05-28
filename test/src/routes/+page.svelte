<script>
	import { intros } from "svelte/internal";
  import { onMount } from 'svelte';
  import { createPlayer} from './stores';
	import Modal from "./Modal/Modal.svelte";

  onMount(() => {
    createPlayer(); // Generate a random player on start up.
  });
</script>