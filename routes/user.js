const express = require('express');
const router = express.Router();
const validator = require('../middleware/auth')
const { getuser, getfriends, addremovefriends, getall, updateuser } = require('../controllers/user')


router.get('/details/:id', getuser)
router.get('/:id/friends', getfriends)
router.get('/listusers', getall)
router.put('/update', updateuser)
router.patch('/:id/:friendId/updatefriends', addremovefriends)

module.exports = router