const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdfdkjfioadfknsdf';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name,email, password } = req.body;

    try {
        const userDataDoc = await userData.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),   

        });
        res.json(userDataDoc); 
    } catch (e){
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDataDoc = await userData.findOne({email});
    if (userDataDoc) {
        const passOk = bcrypt.compareSync(password, userDataDoc.password);
    if (passOk) {
        jwt.sign({
            email: userDataDoc.email,
            id: userDataDoc._id
        },jwtSecret, {} , (err, token) =>{
            if (err) throw err;
            res.cookie('token',token).json(userDataDoc);
        });
    } else{
        res.status(422).json('pass not ok');
    }

    } else {
        res.status(422).json('not found');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret,{}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
          
            res.json({name,email,_id});
        });
    } else{
        res.json(null);
    }
    })
app.listen(4000);