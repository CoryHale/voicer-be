const express = require('express');
const router = express.Router();

const Users = require('./userModel.js');

// /api/users endpoint

// FIXME: Add auth for all endpoints and verify user is the owner of the user

// Insert user into db
router.post('/', async ( req, res ) => {
    const userData = req.body;
    
    try {
        await Users.addUser(userData);
        res.status(201).json({message: "Added user!"})
    }
    catch(error) {
        res.status(500).json({message: "User could not be added", error: error})
    }
})

// Update existing user
router.put('/:id', validateUser, async ( req, res ) => {
    const userData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await Users.updateUser(id, userData);
        res.status(201).json(updatedData)
    }
    catch(error) {
        res.status(500).json({message: "User could not be updated", error: error})
    }
})

// Remove user from db
router.delete('/:id', validateUser, async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedUser = await Users.deleteUser(id);
  
      if (deletedUser) {
        res.status(201).json(deletedUser);
      }
      else {
        res.status(404).json({ message: 'Could not delete user' });
      }
    }
    
    catch (error) {
      res.status(500).json({ message: 'Could not delete user', error: error });
    }
});

// Get all users
router.get('/', validateUser, async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.json(users);
  }
  catch (err) {
    res.status(500).json({ message: 'Could not find users' });
  }
});


// Get user by id
router.get('/:id', validateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const selectedUser = await Users.getUserById(id);

    if (selectedUser) {
      res.json(selectedUser);
    } else {
      res.status(404).json({ message: 'Could not find user.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find user.' });
  }
});

// Validate Middleware

function validateUser(req, res, next) {
  const secret = req.body.secret;

  if (secret === process.env.JWT_SECRET) {
    next();
  } else {
    res.status(400).json({ message: 'unauthorized user: can not perform this action' })
  }
};

module.exports = router;