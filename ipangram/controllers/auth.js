const db = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
module.exports = {
    login: async (req, res, next) => {
        try {
            const payload = req.body;
            const _query = { email: payload.email };
            let user = await db.findOne(_query);
            if (!user) return res.status(301).send({ status: 301, message: "You don't have account with given info." });

            const validPass = await bcrypt.compare(payload.password, user.password);
            if (!validPass) return res.status(301).send({ status: 301, message: "Invalid email and password." });
            const accessToken = jwt.sign({
                _id:user._id,
                username: user.username,
                email: user.email,
                userRole:user.userRole
              }, process.env.JWT_SECRET, {
                expiresIn: '48h',
              })
            res.status(200).send({ status: 200, message: "User logged in successfully.", data: { accessToken, user} });
        }
        catch (err) {
            res.status(301).json({ status: 301, message: err });
        }
    },
    register: async (req, res) => {
        try {
            const payload = req.body;
            //check if email exist
            const emailExist = await db.findOne({ email: payload.email });
            if (emailExist) return res.status(301).send({ status: 302, message: `${payload.email} is already in use.` });
            else {
                //encrypt password before saving into DB
                const salt = await bcrypt.genSalt(8);
                const hashedPassword = await bcrypt.hash(payload.password, salt)
                const newUser = new db({
                    user_name: payload.user_name,
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email,
                    password: hashedPassword,
                    userRole: payload.userRole
                });
                if (payload.password !== payload.confirm_password) {
                    res.status(302).send({ status: 302, message: "Confirm password is invalid." });
                } else {
                    const savedUser = await newUser.save();
                    console.log('\x1b[32m%s\x1b[0m', '\n###### -- Register Execute --######');
                    res.status(200).json({ status: 200, message: "Register successfully", data: savedUser });
                }
            }
        }
        catch (err) {
            res.status(302).json({ status: 302, message: "Invalid Details" });
        }
    },
};