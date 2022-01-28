const router = require('express').Router();
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/generateTokens');
// User Model
const { User } = require('../../models');

//  @route   POST /api/users
//  @desc    Register new user
//  @access  public
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Check for existing user - email and username
    const userSameEmail = await User.findOne({
      where: { email: email },
    });
    if (userSameEmail) {
      return res.status(400).json({ msg: 'Email already registered' });
    }
    const userSameUsername = await User.findOne({
      where: { username: username },
    });
    if (userSameUsername) {
      return res.status(400).json({ msg: 'Username already registered' });
    }
    // Hash Password
    const hashedPW = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPW,
    });
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);
    return res.status(200).send({
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

module.exports = router;
