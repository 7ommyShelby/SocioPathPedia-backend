const express = require('express');
const router = express.Router()
const { getUserPost, getfeedPost, LikePost, commentpost, deletepost } = require('../controllers/post')


router.get('/posts', getfeedPost)
router.get("/:userid/post", getUserPost)
router.patch('/like/:id', LikePost)
router.post('/post/comment', commentpost)
router.delete('/post/delete/:postId', deletepost)

module.exports = router