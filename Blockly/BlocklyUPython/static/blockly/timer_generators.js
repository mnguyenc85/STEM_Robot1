Blockly.Python.forBlock['delay'] = function(block) {
	//Blockly.Python['utime.delay'] = function(block) {
	Blockly.Python.definitions_['import_time'] = 'import time';
	var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
	var dropdown_scale = block.getFieldValue('SCALE');
	var code =  `time.${dropdown_scale}(${value_time})\n`;
	return code;
};

Blockly.Python.forBlock['utime.vars'] = function(block) {
	//For Circuit Python
	if (UI ['workspace'].selector.value == "ESP32S2") {
		Blockly.Python.definitions_['import_time'] = 'import time';
		var code = "time.monotonic()";
	} else {
		Blockly.Python.definitions_['import_utime'] = 'import utime';
		var dropdown_vars = block.getFieldValue('VARS');
		var code =  `utime.${dropdown_vars}()`;
	}
	return [code, Blockly.Python.ORDER_NONE];
};
