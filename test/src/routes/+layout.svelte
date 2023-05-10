<script>
    import '../app.css';
</script>
<style>
    /* Set the background color to black */
  .my-body {
    background-color: black;
  }

  .centered-VTT {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('/images/VTTWindow.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto;
    min-height: 100vh;
    position: relative;
  }

  .title {
    position: absolute;
    top: calc(50% - 372px);
    font-size: 16px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
  }

  .sub-title {
    position: absolute;
    top: calc(50% - 308px);
    font-size: 8px; /* adjust to your desired size */
    text-align: center;
    width: 100%;
    color: white;
  }

  .title-divider {
    position: absolute;
    top: calc(50% - 320px);
  }

  :global(html) {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color:antiquewhite;
  }

  .stat-block {
    position: absolute;
    top: calc(50% + 200px);
    text-align: center;
    width: 100%;
    color: antiquewhite;
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
  </body>

