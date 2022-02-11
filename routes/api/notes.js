const router = require('express').Router();
const { Note } = require('../../models');
const auth = require('../../middleware/auth');
const checkIfUser = require('../../middleware/checkIfUser');

//  @route  GET /api/notes
//  @desc   Return all the notes
//  @access public
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      attributes: {
        exclude: ['userId', 'text'],
      },
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
    return res.status(200).json(newNote.id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//  @route  GET /api/notes/:id
//  @desc   Get a single note data
//  @access public
router.get('/:id', checkIfUser, async (req, res) => {
  let user;
  if (!!req.user) {
    user = req.user;
  }

  const note = await Note.findOne({
    where: { id: req.params.id },
  });
  // If the note is not found return 404
  if (!note) return res.status(404).json({ msg: 'Note Not Found' });
  const noteData = { ...note.dataValues };
  if (user.id === note.dataValues.userId) {
    noteData.isAuthor = true;
  }
  return res.status(200).json(noteData);
});

module.exports = router;
