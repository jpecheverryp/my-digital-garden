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
    if (err) return res.status(500).json({ msg: 'Server Error' });
  }
});

//  @route  GET /api/notes/:id
//  @desc   Get a single note data
//  @access public
router.get('/:id', checkIfUser, async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id },
    });
    // If the note is not found return 404
    if (!note) return res.status(404).json({ msg: 'Note Not Found' });
    const noteData = { ...note.dataValues };
    if (req.user.id === note.dataValues.userId) {
      noteData.isAuthor = true;
    }
    return res.status(200).json(noteData);
  } catch (err) {
    if (err) return res.status(500).json({ msg: 'Server Error' });
  }
});

//  @route  DETETE /api/notes/:id
//  @desc   Delete a note
//  @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ where: { id: req.params.id } });

    if (!note) return res.status(404).json({ msg: 'Note not Found' });
    if (note.userId !== req.user.id) {
      return res.status(403).json({ msg: 'User is not the Author' });
    }
    try {
      const noteId = note.id;
      await note.destroy();
      return res
        .status(200)
        .json({ msg: 'Note Deleted Succesfully', noteId: noteId });
    } catch (err) {
      return res.status(500).json({ msg: 'server error' });
    }
  } catch (err) {
    if (err) return res.status(500).json({ msg: 'Server Error' });
  }
});

//  @route  PUT /api/notes/:id
//  @desc   Update a note
//  @access private
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ where: { id: req.params.id } });

    if (note.userId !== req.user.id) {
      return res.status(403).json({ msg: 'User is not the Author' });
    }
    note.title = req.body.title;
    note.text = req.body.text;
    const noteId = note.id;
    note.save();

    res.status(200).json({ msg: 'Note Updated Succesfully', noteId: noteId });
  } catch (err) {
    if (err) return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
