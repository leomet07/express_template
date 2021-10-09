const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	text: {
		required: true,
		type: String,
	},
});

const itemModelfordb = mongoose.model("Item", itemSchema);

module.exports = itemModelfordb;
