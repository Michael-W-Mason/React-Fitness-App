const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
            res.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true }).json({ userId: user._id});
        })
        .catch(err => res.json(err));
}

module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.sendStatus(400);
    }
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY)
    res.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true, domain: "michaelmason.dev", sameSite: false }).json({ userId: user._id });
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}