const express = require('express');
const router = express.Router()
const { getUserPost, getfeedPost, LikePost } = require('../controllers/post')


router.get('/posts', getfeedPost)
router.get("/:userid/post", getUserPost)
router.patch('/like/:id', LikePost)

module.exports = router