const router = require("express").Router();
const Item = require("../../model/Item");

// Base route
router.get("/", async (req, res) => {
	res.json({ message: "Hello world for /api/db" });
});

router.get("/get_items", get_items_handler);
router.post("/get_items", get_items_handler);
// Create an item
router.post("/create_item", async (req, res, next) => {
	try {
		console.log("req.body", req.body);
		// const saved_item = await create_item(req.body);
		let item = await Item.create(req.body);
		let saved_item = await item.save();
		res.json({
			item: saved_item,
			description: "Successfully created the item.",
		});
	} catch (error) {
		next(error);
	}
});

async function create_item(query) {
	let item = await Item.create(query);
	let saved_item = await item.save();
	return saved_item;
}
async function get_items(query) {
	let items = await Item.find(query);
	return items;
}
async function get_items_handler(req, res, next) {
	try {
		const items = await get_items(req.body || {});
		res.json({
			items: items,
			description: "Successfully retrieved items.",
		});
	} catch (error) {
		next(error);
	}
}

module.exports.router = router;
