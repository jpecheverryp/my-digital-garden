const router = require('express').Router();
const { Note } = require('../../models');
const auth = require('../../middleware/auth');

//  @route  GET /api/notes
//  @desc   Return all the notes
//  @access public
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      attributes: { include: ['id', 'title', 'text', 'createdAt', 'userId'] },
    });
    return res.json(notes);
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//  @route  POST /api/notes
//  @desc   Create New Note
//  @access private
router.post('/', auth, async (req, res) => {
  console.log('here');
  console.log(req.user);
  console.log(req.body);
  if (!req.body.title || !req.body.text) {
    return res
      .status(400)
      .json({ msg: 'Please add a Title and Text to your note' });
  }
  try {
    const newNote = await Note.create({
      title: req.body.title,
      text: req.body.text,
      userId: req.user.id,
    });
    return res.status(200).json(newNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
