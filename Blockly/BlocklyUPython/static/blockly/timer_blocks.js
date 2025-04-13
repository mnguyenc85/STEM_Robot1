Blockly.Blocks['delay'] = {
	init: function () {
		this.jsonInit({
			"type": "delay",
			"message0": "delay %1 %2",
			"args0": [
				{
					"type": "input_value",
					"name": "TIME",
					"check": "Number"
				},
				{
					"type": "field_dropdown",
					"name": "SCALE",
					"options": [
						[MSG["seconds"], "sleep"],
						[MSG["milliseconds"], "sleep_ms"],
						[MSG["microseconds"], "sleep_us"]
					]
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 230,
			"tooltip": "Delay for given number, should be positive or 0.",
			"helpUrl": "https://docs.micropython.org/en/latest/library/utime.html#utime.sleep"
		});
	}
};

Blockly.Blocks['utime.vars'] = {
	init: function () {
		this.jsonInit({
			"type": "utime.vars",
			"message0": "get %1 counter",
			"args0": [
				{
					"type": "field_dropdown",
					"name": "VARS",
					"options": [
						["seconds", "time"],
						["milliseconds", "ticks_ms"],
						["microseconds", "ticks_us"],
						["nanoseconds", "time_ns"],
						["cpu ticks", "ticks_cpu"]
					]
				}
			],
			"output": null,
			"colour": 230,
			"tooltip": "Returns a counter in the defined scale, only integer values.",
			"helpUrl": "https://docs.micropython.org/en/latest/library/utime.html#utime.ticks_ms"
		});
	}
};
