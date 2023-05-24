<script>
  import { writable } from 'svelte/store';
  import { showModal, hideModal, modal, gridItemCategory, gridItemName, displayItemName } from './ModalAddItem'
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
    width: 70%; /* Set the width to 70% */
  height: 55%;
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
    margin-bottom: 24px;
    color: black;
    cursor: pointer;
  }

  .grid-container {
    position: absolute;
    bottom: 156px;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-template-columns: repeat(2, 1fr);
    width: 480px;
    height: 200px;    
    left: 50%;
    transform: translateX(-50%);
    color: #282828;
}

  .grid-item {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 16px;
    cursor: pointer;
  }
  .grid-item:hover {
    font-weight: bold;
  }

.grid-heading {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    font-size: 20px;
    text-align: left;
    color: rgb(48, 48, 48);
  }

.text-area-container {
  width: 96%;
  margin: 20px auto;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-area {
  width: 100%;
  height: 80px; /* Set the fixed height */
  resize: none; /* Disable resizing */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  background-color: beige;
  font-family: 'hultog.italic';
  font-size: 16px;
  color: black; /* Set text color to black */
  text-align: center;
}

</style>

{#if $modal}
<div class=modal-wrapper>
  <div class="modal">
    <h2 class="grid-heading">ADD ITEM</h2>
    <!-- Grid items -->
    <div class="grid-container">
      <!-- Grid items -->
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div class="grid-item" on:mouseover={() => displayItemName($gridItemCategory[0])}>{$gridItemCategory[0]}</div>
      <div class="grid-item">{$gridItemName[0]}</div>
      <div class="grid-item">{$gridItemCategory[1]}</div>
      <div class="grid-item">{$gridItemName[1]}</div>
      <div class="grid-item">{$gridItemCategory[2]}</div>
      <div class="grid-item">{$gridItemName[2]}</div>
      <div class="grid-item">{$gridItemCategory[3]}</div>
      <div class="grid-item">{$gridItemName[3]}</div>
      <div class="grid-item">{$gridItemCategory[4]}</div>
      <div class="grid-item">{$gridItemName[4]}</div>
      <div class="grid-item">{$gridItemCategory[5]}</div>
      <div class="grid-item">{$gridItemName[5]}</div>
      <div class="grid-item">{$gridItemCategory[6]}</div>
      <div class="grid-item">{$gridItemName[6]}</div>
      <div class="grid-item">{$gridItemCategory[7]}</div>
      <div class="grid-item">{$gridItemName[7]}</div>
    </div>
    <div class="text-area-container">
    <textarea class="text-area" rows="2" style="width: 80%;" placeholder="Enter your text"></textarea>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="close" on:click={()=>hideModal()}>&times;</div>
    <button class="save" on:click={() => hideModal()}>Save</button>
  </div>
</div>
{/if}
