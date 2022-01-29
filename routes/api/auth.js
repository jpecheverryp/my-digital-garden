const router = require('express').Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/generateTokens');
// User Model
const { User } = require('../../models');

//  @route   POST /api/auth
//  @desc    Authenticate new user
//  @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Find User
    const user = await User.findOne({
      where: { email: email },
    });
    // Verify if user exists
    if (!user) return res.status(200).json({ msg: 'User Does Not Exist' });
    // Verify that password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const accessToken = generateAccessToken(user.id, user.username);
    const refreshToken = generateRefreshToken(user.id, user.username);

    return res.status(200).send({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

//  @route   GET /api/auth/user
//  @desc    Authenticate new user
//  @access  Private
router.get('/user', auth, async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password'] },
  });
  res.status(200).json(user);
});

module.exports = router;
