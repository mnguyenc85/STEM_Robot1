var Chanels = {}

Chanels.isConnecting = null;
Chanels._encoder = new TextEncoder();
Chanels._decoder = new TextDecoder();

Chanels._port = null;
Chanels._writer = null;
Chanels._reader = null;
Chanels._serialConnect = false;

Chanels._BLE_UUID = {
    "Service": '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    "RX": '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
    "TX": '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
}
Chanels._BLE_device = null
Chanels._BLE_writeChar = null;

/**
 * Connect to device or disconnect if connecting
 * @param {string} mode ble | serial
 */
Chanels.connect = async function(mode) {
    if (this.isConnecting == 'serial') {
        await this._serialDisconnect();
    }
    else if (this.isConnecting == 'ble') {
        await this._BLEDisconnect();
    }
    else if (this.isConnecting == null) {
        if (mode == 'serial') await this._serialConnect();
        else if (mode == 'ble') await this._BLEConnect();
    }
}

Chanels.send = async function(data, cb) {    
    if (this.isConnecting == 'serial') { 
        await this._serialSend(data); 
    }
    else if (this.isConnecting == 'ble') {
        await this._BLESend(data);
    }

    if (typeof cb === 'function') cb(); 
}

Chanels.sendCommand = async function(data, cb) {
    data += '\r\n';
    await this.send(data, cb);
}

Chanels.runPython = async function(code, cb) {
    if (this.isConnecting != null) {
        data = `\x05${code}\x04`;
        await this.send(data, cb);
    } else {
        Terminal.addLine('\nNot connect to device\n', 'err');
    }
}

Chanels.stopPython = async function(cb) {
    if (this.isConnecting != null) {
        data = '\x03\x03';
        await this.send(data, cb);
    } else {
        Terminal.addLine('\nNot connect to device\n', 'err');
    }
}

Chanels._BLEConnect = async function() {
    try {
        if (typeof navigator.bluetooth == "undefined") Terminal.addLine("\nWebBluetooth API doesn't available\n", 'err');

        const device = await navigator.bluetooth.requestDevice({
            //filters: [{services: []}]
            optionalServices: [this._BLE_UUID.Service],
            acceptAllDevices: true
        });
        this._BLE_device = device;

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(this._BLE_UUID.Service)

        const notifyChar = await service.getCharacteristic(this._BLE_UUID.TX);
        this._BLE_writeChar = await service.getCharacteristic(this._BLE_UUID.RX);

        await notifyChar.startNotifications();
        notifyChar.addEventListener('characteristicvaluechanged', (event) => {
            const value = this._decoder.decode(event.target.value);
            Terminal.addLine(value);
        });

        Terminal.addLine('\nConnect to device by BLE\n', 'sys');
        this.isConnecting = 'ble';
    }
    catch (err) {
        Terminal.addLine(`\n${err}\n`, 'err');
    }
}

Chanels._BLEDisconnect = async function() {
    if (this._BLE_device && this._BLE_device.gatt.connected) {
        await this._BLE_device.gatt.disconnect();
        Terminal.addLine('\nDisconnected from BLE\n', 'sys');
    }
    else {
        Terminal.addLine('\nNo device to disconnect\n', 'err');
    }
    this.isConnecting = null;
}

Chanels._BLESend = async function(data, cb) {
    if (!this._BLE_writeChar) {
        Terminal.addLine('\nDevice not connected yet\n', 'sys');
        return false;
    }

    await this._BLE_writeChar.writeValue(this._encoder.encode(data));
    return true;
}

Chanels._serialConnect = async function() {
    try {
        // Ask user to select a COM port
        this._port = await navigator.serial.requestPort();

        // Open the serial port
        await this._port.open({ baudRate: 115200 });

        // Set up a readable stream
        this._reader = this._port.readable.getReader();
        this._readLoop(); // Start reading incoming data

        // Set up a writable stream
        this._writer = this._port.writable.getWriter();

        this.isConnecting = 'serial';

        Terminal.addLine('\nPort opened\n', 'sys');
    } catch (err) {
        this.isConnecting = null;

        Terminal.addLine(`\n${err}\n`, 'err');
    }
}

Chanels._serialDisconnect = async function() {
    this._serialConnect = false;
    await this._delay(200);

    if (this._reader) {
        await this._reader.cancel();   // Gracefully stop the reader
        await this._reader.releaseLock();
    }
    
    if (this._writer) {
        await this._writer.releaseLock(); // Release the writer lock
    }
    
    if (this._port && this._port.readable && this._port.writable) {
        await this._port.close();
        Terminal.addLine('\nPort closed\n', 'sys');
    }
}

Chanels._serialSend = async function (data) {
    if (this._writer) {
        var bytes = this._encoder.encode(data);
        await this._writer.write(bytes);
        return true;
    }
    return false;
}

Chanels._readLoop = async function() {
    this._serialConnect = true;
    while (this._serialConnect) {
        try {
            const { value, done } = await this._reader.read();
            if (done) break;
            if (value) {

                Terminal.addLine(`${this._decoder.decode(value)}`);
            }
            await this._delay(50);
        } catch (err) {
            Terminal.addLine(`Serial read: ${err}`, 'err');
            break;
        }
    }
    this.isConnecting = null;
}

/**
 * Delay ms. Usage: async
 * @param {number} ms 
 * @returns Promise 
 */
Chanels._delay = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}