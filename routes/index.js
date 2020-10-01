const express = require("../node_modules/express");
const router = express.Router();
const fs = require("fs");
let { writeData, content } = require("../helpers/helpers");
const id = content[content.length - 1].id + 1;
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
	res.json({ message: "Welcome to the fun!" });
});

// @route GET /api
// @desc Get All Posts
router.get("/api", (req, res) => {
	content.length === 0
		? res.json({ message: "No data available." })
		: res.send(content);
});

// @route GET /id
// @desc Gets a single Post
router.get("/api/:id", (req, res) => {
	const id = req.params.id;
	const post = content.find((p) => p.id == id);

	post
		? res.status(200).json(post)
		: res.json({ message: `id: ${id} does not exist.` });
});

// @route POST /api/new
// @desc Creates a new Post
router.post("/api/new", (req, res) => {
	const new_post = Object.assign({ id }, req.body);
	content.push(new_post);
	fs.writeFile("data/user.json", JSON.stringify(content), (err) => {
		res.status(201).json({
			//status: `${message}`,
			content: { item: new_post },
		});
	});
	console.log(new_post);
});

// @route PUT /api/id
// @desc Updates single Post
router.put("/api/:id", (req, res) => {
	const id = req.params.id * 1;
	const new_post = Object.assign({ id }, req.body);

	const Posts = [];

	content.forEach((current_post) =>
		current_post.id === id ? Posts.push(new_post) : Posts.push(current_post)
	);

	content = Posts;

	writeData(content, `POST: #${id} has been updated.`, res);

	return content;
});

// @route DEL /api/id
// @desc Removes a single Post
router.delete("/api/:id", (req, res) => {
	const id = req.params.id;
	const Posts = content.filter((p) => p.id != id);
	const post = content.find((p) => p.id == id);

	post == undefined
		? res.json({ message: `Post #${id} does not exist.` })
		: (content = Posts);

	writeData(content, `POST #${id} delete successfully`, res);
});

module.exports = router;
