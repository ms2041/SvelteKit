<script>
    import '../app.css';
    import { writable } from 'svelte/store';
    import Modal from './Modal/Modal.svelte';
    import { extractCategories, showModal, hideModal } from './Modal/Modal';
    import { 
      title,
      playerName,
      gridItemStr,
      gridItemDex,
      gridItemWil,
      gridItemHp,
      gridItemEquipment,
      gridItemCompanion,
      gridItemSpecialInformation,
      gridItemShillings,
      gridItemPennies,
      gridItemGuilders,
      createPlayer,
      modifyAbility,
      removeEquipment,
      displayItemModal,
      modifyMoney
      } from './stores';

      let modalRef;
</script>

<style>
    /* Set the background color to black */
  .my-body {
    position: absolute;
    background-color: black;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .centered-VTT {
    position: relative;
    height:768px;
    width:1024px;
 
    background-image: url('/images/VTT-window.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto;
  }

  .title {
    position: relative;
    top: 32px;
    font-size: 12px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
    letter-spacing: 10px;
  }

  .title-divider {
    position: absolute;
    top: 52px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-title {
    position: absolute;
    top: 72px;
    font-size: 18px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
    font-family: 'hultog.regular';
    letter-spacing: 2px;
  }

  :global(html) {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color:antiquewhite;
  }

  #str,
  #dex,
  #wil,
  #hp {
    cursor: pointer;
  }

  .grid-container {
    position: absolute;
    bottom: 16px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: 972px;
    height: 172px;    
    left: 50%;
    transform: translateX(-50%);
}

  .grid-item {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 16px;
  }

  .s-text { /* Select text style. */
    font-weight: normal;
  }
  .s-text:hover {
    cursor: pointer;
    color: rgb(185, 235, 255);
  }

  .grid-heading {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    font-size: 20px;
    text-align: left;
  }

  .span-4 {
    grid-column: span 4;
  }

  .grid-item-ability {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  .sub-grid-item {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 16px;
  }
  /* When an ability is being hovered, the header as well as it's value turns blue. */
  #str:hover,
  #str:hover ~ .sub-grid-item {
    color: rgb(185, 235, 255);
  }
  #dex:hover,
  #dex:hover ~ .sub-grid-item {
    color: rgb(185, 235, 255);
  }
  #wil:hover,
  #wil:hover ~ .sub-grid-item {
    color: rgb(185, 235, 255);
  }
  #hp:hover,
  #hp:hover ~ .sub-grid-item {
    color: rgb(185, 235, 255);
  }

  /* When a money denomination is being hovered, the header as well as it's value turns blue. */
  .grid-item-money {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  /* Change the colour of money text when hovered. */
  #shillings:hover {
    color: rgb(185, 235, 255);
  }

  #pennies:hover {
    color: rgb(185, 235, 255);
  }

  #guilders:hover {
    color: rgb(185, 235, 255);
  }

  #player:hover {
    color: rgb(185, 235, 255);
    cursor: pointer;
  }

</style>
  
  <body class="my-body" on:contextmenu|preventDefault>
    <div class="centered-VTT">
      <div class="title"><h1>{$title}</h1></div>
      <div class="title-divider"><img src="/images/TitleLine.png" alt="Line"></div>
      <button class="sub-title invisible-button" id="player" on:click={() => {
        createPlayer();
      }}>{$playerName}</button>
      <slot></slot>

      <div class="grid-container">
        <div class="grid-heading" id="abilities">ABILITIES</div>
        <div class="grid-heading" id="equipment">EQUIPMENT</div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-heading" id="money">MONEY</div>
        <div class="grid-item-ability">
          <button class="sub-grid-item invisible-button" id="str" on:contextmenu={() => modifyAbility('str', 1)} 
            on:click={() => modifyAbility('str', -1)}>STR</button>
          <div class="sub-grid-item">{$gridItemStr}</div>
        </div>
        <button class="grid-item invisible-button" id="equipmentSlot-0" on:click={() => displayItemModal(0)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(0)}>{$gridItemEquipment[0]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-1" on:click={() => displayItemModal(1)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(1)}>{$gridItemEquipment[1]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-2" on:click={() => displayItemModal(2)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(2)}>{$gridItemEquipment[2]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-3" on:click={() => displayItemModal(3)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(3)}>{$gridItemEquipment[3]}</span></button>
        <div class="grid-item-money">
          <button class="sub-grid-item invisible-button" id='shillings' on:contextmenu={() => modifyMoney('shillings', 1)} 
            on:click={() => modifyMoney('shillings', -1)}>{$gridItemShillings}S</button>
          <button class="sub-grid-item invisible-button" id = 'pennies' on:contextmenu={() => modifyMoney('pennies', 1)} 
            on:click={() => modifyMoney('pennies', -1)}>{$gridItemPennies}P</button>
          <button class="sub-grid-item invisible-button" id = 'guilders' on:contextmenu={() => modifyMoney('guilders', 1)} 
            on:click={() => modifyMoney('guilders', -1)}>{$gridItemGuilders}G</button>
        </div>
        <div class="grid-item-ability">
          <button class="sub-grid-item invisible-button" id="dex" on:contextmenu={() => modifyAbility('dex', 1)} 
            on:click={() => modifyAbility('dex', -1)}>DEX</button>
          <div class="sub-grid-item">{$gridItemDex}</div>
        </div>
        <button class="grid-item invisible-button" id="equipmentSlot-4" on:click={() => displayItemModal(4)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(4)}>{$gridItemEquipment[4]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-5" on:click={() => displayItemModal(5)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(5)}>{$gridItemEquipment[5]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-6" on:click={() => displayItemModal(6)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(6)}>{$gridItemEquipment[6]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-7" on:click={() => displayItemModal(7)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(7)}>{$gridItemEquipment[7]}</span></button>
        <div class="grid-item"></div>
        <div class="grid-item-ability">
          <button class="sub-grid-item invisible-button" id="wil" on:contextmenu={() => modifyAbility('wil', 1)} 
            on:click={() => modifyAbility('wil', -1)}>WIL</button>
          <div class="sub-grid-item">{$gridItemWil}</div>
        </div>
        <button class="grid-item invisible-button" id="equipmentSlot-8" on:click={() => displayItemModal(8)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(8)}>{$gridItemEquipment[8]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-9" on:click={() => displayItemModal(9)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(9)}>{$gridItemEquipment[9]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-10" on:click={() => displayItemModal(10)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(10)}>{$gridItemEquipment[10]}</span></button>
        <button class="grid-item invisible-button" id="equipmentSlot-11" on:click={() => displayItemModal(11)}
          ><span class="s-text" on:contextmenu={() => removeEquipment(11)}>{$gridItemEquipment[11]}</span></button>
        <div class="grid-heading">COMPANION</div>
        <div class="grid-item-ability">
          <button class="sub-grid-item invisible-button" id="hp" on:contextmenu={() => modifyAbility('hp', 1)} 
            on:click={() => modifyAbility('hp', -1)}>HP</button>
          <div class="sub-grid-item">{$gridItemHp}</div>
        </div>
        <div class="grid-heading span-4">SPECIAL INFORMATION</div>
        <div class="grid-item">{$gridItemCompanion}</div>
        <div class="grid-item"></div>
        <div class="grid-item span-4" id="special-info">{$gridItemSpecialInformation}</div>
      </div>
    </div>
    <Modal bind:this={modalRef}/>
  </body>