/*
templates/tab_terminal.html
*/

var Terminal = {}

Terminal._eTerminal = null;
Terminal._eScreen = null;
Terminal._eLastLine = null;
Terminal._eCmd = null;

Terminal.init = function() {
    this._eTerminal = document.getElementById('tab-terminal');
    this._eScreen = document.getElementById('terminal-screen');
    this._eCmd = document.getElementById('terminal-cmd');
    
    this._eCmd.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            let cmd = this._eCmd.value;
            this.addLine('>>> ' + cmd + '\n', 'cmd')
            Chanels.sendCommand(cmd, () => { this._eCmd.value = ""; })
        }
    })

}

Terminal.addLine = function(msg, classes='') {    
    let ss = msg.split(/\r\n|\r|\n/);
    let endl = false;
    let n = ss.length;
    if (ss[n - 1].length === 0) {
        n = n - 1;
        endl = true;
    }

    let curLine = this._eLastLine;
    for (let i = 0; i < n; i++) {
        if (curLine == null) {
             curLine = document.createElement('pre');
            curLine.className = classes;
        }

        if (ss[i].length === 0) curLine.className += ' empty';
        else curLine.innerText += ss[i];

        this._eScreen.appendChild(curLine);
        if (i < n - 1) curLine = null;
    }
    if (!endl) this._eLastLine = curLine;
    else this._eLastLine = null;

    this._eTerminal.scrollTop = this._eTerminal.scrollHeight;
}

Terminal.init();