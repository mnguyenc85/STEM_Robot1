Blockly.Blocks['print_text_1'] = {
  init: function() {
      this.appendValueInput("TEXT")
          .setCheck("String")
          .appendField("print");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Print text to console");
      this.setHelpUrl("");
  }
};
