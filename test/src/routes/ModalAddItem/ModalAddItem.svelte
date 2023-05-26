<script>
  import { writable } from 'svelte/store';
  import {
    showModal, 
    hideModal, 
    modal, 
    gridItemCategory, 
    gridItemName, 
    displayItemNames, 
    toggleClicked, 
    selectItem, 
    boldCategory, 
    boldItem, 
    boldCategoryField,
    unboldCategoryField,
    boldItemField,
    unboldItemField
    } from './ModalAddItem'
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
    left: 63%;
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
  }
  .grid-item span {
    font-weight: normal;
    cursor: default;
  }

  .grid-item span.is-bold {
    font-weight: bold;
    cursor: pointer;
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
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[0]}
          on:mouseover={() => displayItemNames($gridItemCategory[0], 0)}
          on:mouseout={() => displayItemNames('', 0)}
          on:focus={() => displayItemNames($gridItemCategory[0], 0)}
          on:blur={() => displayItemNames('', 0)}
          on:click={() => toggleClicked($gridItemCategory[0])}>
          {$gridItemCategory[0]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[0]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[0]}
          on:mouseover={() => boldItemField(0)}
          on:mouseout={() => unboldItemField(0)}
          on:click={() => selectItem('0')}>{$gridItemName[0]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[1]}
          on:mouseover={() => displayItemNames($gridItemCategory[1], 1)}
          on:mouseout={() => displayItemNames('', 1)}
          on:focus={() => displayItemNames($gridItemCategory[1], 1)}
          on:blur={() => displayItemNames('', 1)}
          on:click={() => toggleClicked($gridItemCategory[1])}>
          {$gridItemCategory[1]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[1]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[1]}
          on:mouseover={() => boldItemField(1)}
          on:mouseout={() => unboldItemField(1)}
          on:click={() => selectItem('1')}>{$gridItemName[1]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[2]}
          on:mouseover={() => displayItemNames($gridItemCategory[2], 2)}
          on:mouseout={() => displayItemNames('', 2)}
          on:focus={() => displayItemNames($gridItemCategory[2], 2)}
          on:blur={() => displayItemNames('', 2)}
          on:click={() => toggleClicked($gridItemCategory[2])}>
          {$gridItemCategory[2]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[2]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[2]}
          on:mouseover={() => boldItemField(2)}
          on:mouseout={() => unboldItemField(2)}
          on:click={() => selectItem('2')}>{$gridItemName[2]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[3]}
          on:mouseover={() => displayItemNames($gridItemCategory[3], 3)}
          on:mouseout={() => displayItemNames('', 3)}
          on:focus={() => displayItemNames($gridItemCategory[3], 3)}
          on:blur={() => displayItemNames('', 3)}
          on:click={() => toggleClicked($gridItemCategory[3])}>
            {$gridItemCategory[3]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[3]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[3]}
          on:mouseover={() => boldItemField(3)}
          on:mouseout={() => unboldItemField(3)}
          on:click={() => selectItem('3')}>{$gridItemName[3]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[4]}
          on:mouseover={() => displayItemNames($gridItemCategory[4], 4)}
          on:mouseout={() => displayItemNames('', 4)}
          on:focus={() => displayItemNames($gridItemCategory[4], 4)}
          on:blur={() => displayItemNames('', 4)}
          on:click={() => toggleClicked($gridItemCategory[4])}>
          {$gridItemCategory[4]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[4]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[4]}
          on:mouseover={() => boldItemField(4)}
          on:mouseout={() => unboldItemField(4)}
          on:click={() => selectItem('4')}>{$gridItemName[4]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[5]}
          on:mouseover={() => displayItemNames($gridItemCategory[5], 5)}
          on:mouseout={() => displayItemNames('', 5)}
          on:focus={() => displayItemNames($gridItemCategory[5], 5)}
          on:blur={() => displayItemNames('', 5)}
          on:click={() => toggleClicked($gridItemCategory[5])}>
          {$gridItemCategory[5]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[5]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[5]}
          on:mouseover={() => boldItemField(5)}
          on:mouseout={() => unboldItemField(5)}
          on:click={() => selectItem('5')}>{$gridItemName[5]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[6]}
          on:mouseover={() => displayItemNames($gridItemCategory[6], 6)}
          on:mouseout={() => displayItemNames('', 6)}
          on:focus={() => displayItemNames($gridItemCategory[6], 6)}
          on:blur={() => displayItemNames('', 6)}
          on:click={() => toggleClicked($gridItemCategory[6])}>
          {$gridItemCategory[6]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[6]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[6]}
          on:mouseover={() => boldItemField(6)}
          on:mouseout={() => unboldItemField(6)}
          on:click={() => selectItem('6')}>{$gridItemName[6]}</span>
        {/if}
      </button>
      <div class="grid-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class:is-bold={$boldCategory[7]}
          on:mouseover={() => displayItemNames($gridItemCategory[7], 7)}
          on:mouseout={() => displayItemNames('', 7)}
          on:focus={() => displayItemNames($gridItemCategory[7], 7)}
          on:blur={() => displayItemNames('', 7)}
          on:click={() => toggleClicked($gridItemCategory[7])}>
          {$gridItemCategory[7]}
        </span>
      </div>
      <button class="grid-item invisible-button-dark">
        {#if $gridItemName[7]}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <span
          class:is-bold={$boldItem[7]}
          on:mouseover={() => boldItemField(7)}
          on:mouseout={() => unboldItemField(7)}
          on:click={() => selectItem('7')}>{$gridItemName[7]}</span>
        {/if}
      </button>
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
