const express = require("express")
const router = express.Router()

const PostController = require("../controllers/PostController")

router.post("/post/insert", PostController.insert)
router.post("/tag/list", PostController.findTags)

module.exports = router