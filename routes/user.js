const express = require('express');
const router = express.Router();
const validator = require('../middleware/auth')
const { getuser, getfriends, addremovefriends, getall } = require('../controllers/user')


router.get('/get/:id', getuser)
router.get('/:id/friends', getfriends)
router.get('/getall', getall)
router.patch('/:id/:friendId/updatefriends', addremovefriends)

module.exports = router