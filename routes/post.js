const express = require('express');
const router = express.Router()
const { getUserPost, getfeedPost, LikePost, commentpost } = require('../controllers/post')


router.get('/posts', getfeedPost)
router.get("/:userid/post", getUserPost)
router.patch('/like/:id', LikePost)
router.post('/post/comment', commentpost)

module.exports = router