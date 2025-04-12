Blockly.Blocks['delay'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck(null)
            .appendField(MSG["block_delay"]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[MSG["seconds"],"sleep"], [MSG["milliseconds"],"sleep_ms"], [MSG["microseconds"],"sleep_us"]]), "SCALE"); //i18n
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Delay for given number, should be positive or 0.");
        this.setHelpUrl("https://docs.micropython.org/en/latest/library/utime.html#utime.sleep");
    }
}
    
