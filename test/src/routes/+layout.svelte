<script>
    import '../app.css';
    import { writable } from 'svelte/store';
    export const equipmentStore = writable(["", "", "", "", "", "", "", "", ""]);
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
  /*background-color: #141414;*/
  /*border: 1px solid #282828;*/
  font-family: 'hultog.italic';
  display: flex;
  align-items: center;
  text-align: left;
}

.grid-heading {
  /*background-color: #141414;*/
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
  /*background-color: #141414;*/
  /*border: 1px solid #282828;*/
  font-family: 'hultog.italic';
  display: flex;
  align-items: center;
  text-align: left;
}

.grid-item-money {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

  .title {
    position: relative;
    top: 32px;
    font-size: 12px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
  }

  .title-divider {
    position: absolute;
    top: 52px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-title {
    position: absolute;
    top: 64px;
    font-size: 8px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
  }

  :global(html) {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color:antiquewhite;
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
      <div class="sub-title">
        <h1><em>Seven Against Thebes</em></h1>
      </div>
      <slot></slot>

      <div class="grid-container">
        <div class="grid-heading" id="abilities">ABILITIES</div>
        <div class="grid-heading" id="equipment">EQUIPMENT</div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-heading" id="arcana">ARCANA</div>
        <div class="grid-heading" id="money">MONEY</div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">STR</div>
          <div class="sub-grid-item">16</div>
        </div>
        <div class="grid-item" id="equipmentSlot-0">Claymore (d8 B)</div>
        <div class="grid-item" id="equipmentSlot-1">Poison</div>
        <div class="grid-item" id="equipmentSlot-2">Shovel</div>
        <div class="grid-item">Pierced Heart</div>
        <div class="grid-item-money">
          <div class="sub-grid-item">12S</div>
          <div class="sub-grid-item">36C</div>
          <div class="sub-grid-item">3G</div>
        </div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">DEX</div>
          <div class="sub-grid-item">9</div>
        </div>
        <div class="grid-item" id="equipmentSlot-3">14</div>
        <div class="grid-item" id="equipmentSlot-4">15</div>
        <div class="grid-item" id="equipmentSlot-5">16</div>
        <div class="grid-item">17</div>
        <div class="grid-item">18</div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">WIS</div>
          <div class="sub-grid-item">10</div>
        </div>
        <div class="grid-item" id="equipmentSlot-6">20</div>
        <div class="grid-item" id="equipmentSlot-7">21</div>
        <div class="grid-item" id="equipmentSlot-8">22</div>
        <div class="grid-item">23</div>
        <div class="grid-item">24</div>
        <div class="grid-item-ability">
          <div class="sub-grid-item">HP</div>
          <div class="sub-grid-item">4</div>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
      </div>
      
    </div>
  </body>