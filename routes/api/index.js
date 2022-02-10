const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const notes = require('./notes');

router.use('/users', users);
router.use('/auth', auth);
router.use('/notes', notes);

module.exports = router;
