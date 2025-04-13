Blockly.Blocks['var_to_int'] = {
  init: function () {
    this.jsonInit({
      "type": "var_to_int",
      "message0": "to int %1",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE1"
        }
      ],
      "output": null,
      "colour": 230,
      "tooltip": "Convert anything to Int.",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['var_to_float'] = {
  init: function () {
    this.jsonInit({
      "type": "var_to_float",
      "message0": "to float %1",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE1"
        }
      ],
      "output": null,
      "colour": 230,
      "tooltip": "Convert anything to float.",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['math_min'] = {
  init: function () {
    this.jsonInit({
      "type": "math_min",
      "message0": "min of %1 and %2",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE1",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "VALUE2",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": 230,
      "tooltip": "Get min of two values.",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['math_max'] = {
  init: function () {
    this.jsonInit({
      "type": "math_max",
      "message0": "max of %1 and %2",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE1",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "VALUE2",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": 230,
      "tooltip": "Get max of two values",
      "helpUrl": ""
    });
  }
};