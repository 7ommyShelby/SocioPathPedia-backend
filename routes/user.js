const express = require('express');
const router = express.Router();
const validator = require('../middleware/auth')
const { getuser, getfriends, addremovefriends, getall } = require('../controllers/user')


router.get('/details/:id', getuser)
router.get('/:id/friends', getfriends)
router.get('/users', getall)
router.patch('/:id/:friendId/updatefriends', addremovefriends)

module.exports = router