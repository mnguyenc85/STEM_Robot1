/*
Xử lý UI
Liên quan chặt chẽ với index.html
*/

var UI = { }

UI.curTab = 'prog';
UI.connectType = null;

UI.connect = async function() {

    if (this.connectType != null) {
        await Chanels.connect(this.connectType);

        const connIcon = document.getElementById('btconnect-icon');
        if (Chanels.isConnecting) connIcon.innerText = 'power';
        else connIcon.innerText = 'power_off';
    }
}

/**
 * Change connection type
 * @param {string} t ble | serial | (wifi)
 */
UI.changeConnect = function(t) {
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
UI.changeTab = function(tab) {
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
UI.toggle = function(id) {
    var e = document.getElementById(id);
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
    
    var eOn, eOff;
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
        var code = Blockly.Python.workspaceToCode(workspace);
        const codeElement = eCanvasPython.querySelector(".w3-code code");
        const highlightedCode = hljs.highlight(
            code,
            { language: 'python' }
        ).value
        codeElement.innerHTML = highlightedCode;
    }
}

UI._changeDivVis = function(id, vis) {
    const e = document.getElementById(id);
    if (e) {
        if (vis) e.style.display = 'block';
        else e.style.display = 'none';
    }
}
