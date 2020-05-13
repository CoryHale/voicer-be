const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

router.post('/register', async (req, res) => {
  console.log(req.body)
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  console.log(hash)
  user.password = hash;
  try {
    console.log("here")
    await Users.addUser(user);
    console.log("here 2")
    res.status(201).json({ message: 'New User Registered', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Could Not Register User', error: error });
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    console.log("Checkpoint 1")
    const user = await Users.findBy({ username });
    console.log("Checkpoint 2")
    if (user && bcrypt.compareSync(password, user.password)) {
      console.log("Checkpoint 3")
      const token = genToken(user);
      console.log("Checkpoint 4")
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

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1h'
  };
  
  return jwt.sign(payload, secret, options);
};

module.exports = router;
