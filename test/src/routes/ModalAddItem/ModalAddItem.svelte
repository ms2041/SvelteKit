<script>
  import { writable } from 'svelte/store';

  // Create a writable store instance for the modal
  export const modal = writable(false);

  export function showModal() {
    console.log('Show Modal');
    modal.set(true);
    // Extra code here.
  }

  export function hideModal() {
    console.log('Hide Modal');
    modal.set(false);
    // Extra code here.
  }
</script>

<style>
   .modal-wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

    .modal {
      background-color: beige;
      width: 55%;
      height: 55%;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -108px;
      position: relative; /* Positions the close button. */
    }

    .close { /* Close button. */
      position: absolute;
      top: 10px;
      right: 10px;
      color: black;
      cursor: pointer;
    }
    .close:hover {
        font-weight: bold;
    }

    .save { /* Save button. */
      margin-top: auto;
      margin-bottom: 20px;
      color: black;
      cursor: pointer;
    }
</style>

{#if $modal}
<div class=modal-wrapper>
  <div class="modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="close" on:click={()=>hideModal()}>&times;</div>
    <button class="save" on:click={() => hideModal()}>Save</button>
  </div>
</div>
{/if}
