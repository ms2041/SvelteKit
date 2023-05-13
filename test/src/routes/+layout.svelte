<script>
    import '../app.css';
    import { writable } from 'svelte/store';
    import { equipmentStore, getStarterPackage, myplayer, makeplayer } from './stores';
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

  #equipment {
     cursor: pointer;
  }

  #abilities {
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
  }

  .grid-heading {
    /*border: 1px solid #282828;*/
    font-family: 'hultog.italic';
    font-size: 20px;
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

  .grid-item-money {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
</style>
  
  <body class="my-body">
    <div class="centered-VTT">
      <div class="title">
        <h1>INTO THE ODD</h1>
      </div>
      <div class="title-divider">
        <img src="/images/TitleLine.png" alt="Line">
      </div>
      <div class="sub-title" id="player">
      </div>
      <slot></slot>

      <div class="grid-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="grid-heading" id="abilities" on:click={() => {
          makeplayer(myplayer);
        }}>ABILITIES</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="grid-heading" id="equipment" on:click={() => {
          // getStarterPackage(); No longer required.
        }}>
          EQUIPMENT
        </div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-heading" id="arcana">ARCANA</div>
        <div class="grid-heading" id="money">MONEY</div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">STR</div>
          <div class="sub-grid-item" id="str"></div>
        </div>
        <div class="grid-item" id="equipmentSlot-0"></div>
        <div class="grid-item" id="equipmentSlot-1"></div>
        <div class="grid-item" id="equipmentSlot-2"></div>
        <div class="grid-item" id="arcanaSlot-0"></div>
        <div class="grid-item-money">
          <div class="sub-grid-item">0S</div>
          <div class="sub-grid-item">0C</div>
          <div class="sub-grid-item">0G</div>
        </div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">DEX</div>
          <div class="sub-grid-item" id="dex"></div>
        </div>
        <div class="grid-item" id="equipmentSlot-3"></div>
        <div class="grid-item" id="equipmentSlot-4"></div>
        <div class="grid-item" id="equipmentSlot-5"></div>
        <div class="grid-item" id="arcanaSlot-1"></div>
        <div class="grid-item"></div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">WIL</div>
          <div class="sub-grid-item" id="wil"></div>
        </div>
        <div class="grid-item" id="equipmentSlot-6"></div>
        <div class="grid-item" id="equipmentSlot-7"></div>
        <div class="grid-item" id="equipmentSlot-8"></div>
        <div class="grid-item" id="arcanaSlot-2"></div>
        <div class="grid-heading">COMPANION</div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">HP</div>
          <div class="sub-grid-item" id="hp"></div>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item" id="arcanaSlot-3"></div>
        <div class="grid-item" id="companionSlot"></div>
        <div class="grid-item" id="special-info"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
      </div>
    </div>
  </body>