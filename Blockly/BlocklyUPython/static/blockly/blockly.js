var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    grid: {
        spacing: 20,        // px between grid lines
        length: 1,          // length of line (0 = invisible)
        colour: '#777',     // grid line color
        snap: true          // snap blocks to grid
      },
      zoom: {
        controls: true,     // show zoom in/out buttons
        wheel: true,        // zoom with mouse wheel
        startScale: 1.0,    // initial zoom scale (1 = 100%)
        maxScale: 3,        // max zoom level
        minScale: 0.3,      // min zoom level
        scaleSpeed: 1.2     // how fast zooming happens
      },
      trashcan: true  
});
