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
            const token = user.generateToken();
            const doc = await user.save();
            // send email (at end of course)
            // save token and send with cookie
            res.cookie('access-token', token)
                .status(200).send(getUserProps(doc));
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error })
        }
    })

router.route("/signin")
    .post(async (req, res) => {
        try {
            // find user
            let user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(400).json({ message: 'Bad email' });

            // compare password
            const compare = await user.comparePassword(req.body.password);
            if (!compare) return res.status(400).json({ message: 'Bad password' });

            //generate token
            const token = user.generateToken();

            //response
            res.cookie('access-token', token)
                .status(200).send(getUserProps(user));
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error })
        }

    })

const getUserProps = (user) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role

    }
}


module.exports = router;