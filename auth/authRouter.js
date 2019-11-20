const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  try {
    await Users.addUser(user);
    res.status(201).json({ message: 'New User Registered', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Could Not Register User', error: error });
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      const { userId, userType } = user;
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token,
        userId,
        userType
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error });
  }
});

const genToken = user => {
  const payload = {
    subject: 'user',
    userId: user.userId,
    username: user.username,
    userType: user.userType
  };

  console.log(payload);

  const secret = process.env.JWT_SECRET;

  console.log(secret);

  const options = {
    expiresIn: '1h'
  };

  console.log(options);

  return jwt.sign(payload, secret, options);
};

module.exports = router;
