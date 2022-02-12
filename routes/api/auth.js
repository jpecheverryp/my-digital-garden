const router = require('express').Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/generateTokens');
// User Model
const { User, Token } = require('../../models');

//  @route   POST /api/auth
//  @desc    Authenticate new user
//  @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  // Find User
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    // Verify if user exists
    if (!user) return res.status(404).json({ msg: 'User Does Not Exist' });
    // Verify that password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid Password' });
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
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(user);
  } catch (error) {
    if (error) return res.status(500).send(err);
  }
});

//  @route   DELETE /api/auth/logout
//  @desc    Destroy Refresh Token
//  @access  Public
router.delete('/logout', async (req, res) => {
  try {
    const token = await Token.destroy({
      where: {
        token: req.body.token,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    if (err) return res.sendStatus(500);
  }
});

//  @route   DELETE /api/auth/token
//  @desc    Generate Access Token using Refresh Token
//  @access  Public
router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  try {
    const foundOne = await Token.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!foundOne) return res.status(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken(user.id, user.username);
      res.json({ accessToken: accessToken, username: user.username });
    });
    return;
  } catch (error) {
    if (err) return res.status(403);
  }
});

module.exports = router;
