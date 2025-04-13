/// Convert to Int
Blockly.Python.forBlock['var_to_int'] = function (block) {
  let value1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
  let code = 'int(' + value1 + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

/// Convert to Float
Blockly.Python.forBlock['var_to_float'] = function (block) {
  let value1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
  let code = 'float(' + variable + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.forBlock['math_min'] = function (block) {
  let value1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
  let value2 = Blockly.Python.valueToCode(block, 'VALUE2', Blockly.Python.ORDER_ATOMIC);
  let code = 'min(' + value1 + ', ' + value2 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.forBlock['math_max'] = function (block) {
  let value1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
  let value2 = Blockly.Python.valueToCode(block, 'VALUE2', Blockly.Python.ORDER_ATOMIC);
  let code = 'max(' + value1 + ', ' + value2 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};
