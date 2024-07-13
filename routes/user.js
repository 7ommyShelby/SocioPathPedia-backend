const express = require('express');
const router = express.Router();
const validator = require('../middleware/auth')
const { getuser, getfriends, addremovefriends } = require('../controllers/user')


router.get('/:id', getuser)
router.get('/:id/friends', getfriends)
router.patch('/:id/:friendId/updatefriends', addremovefriends)

module.exports = router