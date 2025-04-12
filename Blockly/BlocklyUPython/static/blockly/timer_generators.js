Blockly.Python.forBlock['delay'] = function(block) {
    //Blockly.Python['utime.delay'] = function(block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
    var dropdown_scale = block.getFieldValue('SCALE');
    var code =  `time.${dropdown_scale}(${value_time})\n`;
    return code;
};
   