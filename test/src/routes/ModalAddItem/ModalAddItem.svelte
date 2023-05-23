<script>
  import { writable } from 'svelte/store';

  export function showModal() {
    console.log('Show Modal');
    writable.modal = true;
    // Extra code here.
  }

  export function hideModal() {
    console.log('Hide Modal');
    writable.modal = false;
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
    justify-content: center;
    align-items: center;
  }

    .modal {
      background-color: beige;
      width: 55%;
      height: 55%;
      border-radius: 10px;
      display: flex;
      justify-content: center;
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
</style>

{#if writable.modal}
<div class=modal-wrapper>
  <div class="modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="close" on:click={()=>hideModal()}>&times;</span>
  </div>
</div>
{/if}
