import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import sendMessage from "../MessageClient/messageService";
import 'babel-polyfill';

const users = express.Router()
users.use(cors());

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        otp: Math.floor(1000 + Math.random() * 9000).toString(),
        created: today
    }

    User.findOne({
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(async user => {
                            const messageResponse = await sendMessage('Nexmo', user.number, `Your OTP for this app is ${user.otp}`);
                            if(messageResponse.error){
                                res.send('error: ' + messageResponse.error)
                            }
                            res.json({ email: user.email, phoneNumber:user.number, status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/generateotp', (req, res) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    User.updateOne({
        phoneNumber: req.body.phoneNumber
    }, {otp})
        .then()
        .catch(err => {
            res.send('error: ' + 'user is not registered with this phone number' + err);
        })
    User.findOne({
            phoneNumber: req.body.phoneNumber
        }).then(async user => {
            if (user) {
                console.log(user);
                const messageResponse = await sendMessage('Nexmo', user.phoneNumber, `Your OTP for this app is ${user.otp}`);
                console.log('messageResponse', messageResponse);
                if(messageResponse.error){
                    res.send('error: ' + messageResponse.error)
                }
                res.json({ success:'Otp has been generated'});
            }
        })
})

users.post('/verifyotp', (req, res) => {
    User.findOne({
        phoneNumber: req.body.phoneNumber
    })
        .then(user => {
            if (user) {
                    const originalOtp = user.otp;
                    if(originalOtp === req.body.otp) {
                        const payload = {
                            _id: user._id,
                            email: user.email
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.send(token);
                    }
                } else {
                    res.json({ error: "Otp entered is not correct" })
                }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: "Username Password combination does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

export default users;
