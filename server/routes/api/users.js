const express = require('express');
let router = express.Router();
require('dotenv').config();


const { User } = require('../../models/user_model');

router.route("/register")
    .post(async (req, res) => {
        try {
            // check if email is taken
            if (await User.emailTaken(req.body.email)) {
                return res.status(400).json({ message: 'Sorry email taken' })
            }
            // creating the instance of the model (hash password)
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });
            // generate token
            const doc = await user.save();
            // send email (at end of course)
            // save token and send with cookie
            res.cookie('access-token', 'TODO')
                .status(200).send(doc);
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error })
        }
    })


module.exports = router;