/*
Xử lý UI
Liên quan chặt chẽ với index.html
*/

var UI = {}

UI.curTab = 'prog';
UI.connectType = null;
UI._blinks = {}

UI.connect = async function () {

    if (this.connectType != null) {
        this._startBlinkIcon("btconnect-icon");

        await Chanels.connect(this.connectType);

        const connIcon = document.getElementById('btconnect-icon');
        if (Chanels.isConnecting) connIcon.innerText = 'power';
        else connIcon.innerText = 'power_off';

        this._stopBlinkIcon("btconnect-icon");
    }
}

UI.runPython = async function () {
    let code = Blockly.Python.workspaceToCode(workspace);
    Terminal.addLine('\nRun blockly\n', 'sys');
    Chanels.runPython(code + '\r\r');
}

UI.stopPython = function () {
    Chanels.stopPython(() => {
        Terminal.addLine('\nStop python\n', 'sys');
    });
}

UI.saveWorkspaceToFile = async function () {
    const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    const xmlText = Blockly.Xml.domToPrettyText(xml);
  
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'my_blocks.xml',
        types: [{
          description: 'Blockly XML',
          accept: { 'text/xml': ['.xml'] }
        }]
      });
  
      const writable = await handle.createWritable();
      await writable.write(xmlText);
      await writable.close();
      console.log("Workspace saved.");
    } catch (err) {
      console.warn("Save canceled or failed:", err);
    }
}

UI.loadWorkspaceFromFile = function (event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const xmlText = e.target.result;
      try {
        const xml = Blockly.utils.xml.textToDom(xmlText);
        const workspace = Blockly.getMainWorkspace();
        workspace.clear(); // Optional: clear current workspace
        Blockly.Xml.domToWorkspace(xml, workspace);
        console.log("Workspace loaded.");
      } catch (err) {
        alert("Invalid Blockly XML file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
}
UI.triggerFileLoad = function(id) {
    document.getElementById(id).click();
}

/**
 * Change connection type
 * @param {string} t ble | serial | (wifi)
 */
UI.changeConnect = function (t) {
    const eConnType = document.getElementById('connect-type-icon');

    if (t == 'ble') {
        eConnType.innerText = 'bluetooth';
        this.connectType = 'ble';
    }
    else if (t == 'serial') {
        eConnType.innerText = 'cable';
        this.connectType = 'serial';
    }
    else {
        eConnType.innerText = 'usb';
        this.connectType = null;
    }

    this.toggle('connect-type-panel');
}

/**
 * Change tab when user click nav
 */
UI.changeTab = function (tab) {
    if (this.curTab == tab) {
        return;
    }
    else {
        const eTab0 = document.getElementById("nav-" + this.curTab);
        eTab0.classList.remove('w3-light-green');

        const eTab = document.getElementById("nav-" + tab);
        eTab.classList.add('w3-light-green')

        this._changeDivVis('nav-prog-tools', tab == 'prog');
        this._changeDivVis('tab-prog', tab == 'prog');
        this._changeDivVis('tab-terminal', tab == 'terminal')

        UI.curTab = tab;
    }
}

/**
 * Make DOM element show or hide by add/remove 'w3-show' 
 * @param {string} id id of element
 */
UI.toggle = function (id) {
    let e = document.getElementById(id);
    if (e.className.indexOf("w3-show") == -1) {
        e.className += ' w3-show';
    } else {
        e.className = e.className.replace(' w3-show', "");
    }
}

/**
 * Toggle between blockly and python
 * @param {string} code python | blockly
 */
function toggleCode(code) {
    const eCodeBlockly = document.getElementById("code-blockly");
    const eCodePython = document.getElementById("code-python");
    const eCanvasBlockly = document.getElementById("canvas-blockly");
    const eCanvasPython = document.getElementById("canvas-python");

    let eOn, eOff;
    if (code == 'blockly') {
        eOn = eCodeBlockly;
        eOff = eCodePython;
        eCanvasBlockly.style.display = 'flex';
        eCanvasPython.style.display = 'none';
    }
    else {
        eOff = eCodeBlockly;
        eOn = eCodePython;
        eCanvasBlockly.style.display = 'none';
        eCanvasPython.style.display = 'block';
    }
    eOn.classList.remove("w3-grayscale-max");
    eOn.classList.add("w3-border");
    eOn.classList.add("w3-light-green");
    eOff.classList.add("w3-grayscale-max");
    eOff.classList.remove("w3-border");
    eOff.classList.remove("w3-light-green");

    if (code == 'python') {
        let code = Blockly.Python.workspaceToCode(workspace);
        const codeElement = eCanvasPython.querySelector(".w3-code code");
        const highlightedCode = hljs.highlight(
            code,
            { language: 'python' }
        ).value
        codeElement.innerHTML = highlightedCode;
    }
}

UI._changeDivVis = function (id, vis) {
    const e = document.getElementById(id);
    if (e) {
        if (vis) e.style.display = 'block';
        else e.style.display = 'none';
    }
}

UI._startBlinkIcon = async function (id) {
    let eIcon = document.getElementById(id)
    if (eIcon) {
        this._blinks[id] = true;
        while (this._blinks[id]) {
            eIcon.className += ' my-blink-color';
            await this._delay(500);
            eIcon.className = eIcon.className.replace(' my-blink-color', "");
            await this._delay(500);
        }
    }
}

UI._stopBlinkIcon = function (id) {
    this._blinks[id] = false;
}


// TODO: utils.js???
/**
 * Delay ms. Usage: async
 * @param {number} ms 
 * @returns Promise 
 */
UI._delay = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
