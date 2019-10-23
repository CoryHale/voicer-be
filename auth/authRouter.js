const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');

router.post('/register', async ( req, res ) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    try {
        await Users.addUser(user);
        res.status(201).json({message: "New User Registered", user: user})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Register User", error: error})
    }
})

module.exports = router;