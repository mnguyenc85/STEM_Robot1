Blockly.Python.forBlock['print_text_1'] = function(block) {
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || "''";
    var code = 'print(' + text + ')\n';
    console.log('print_text_1:', code)
    return code;
};  