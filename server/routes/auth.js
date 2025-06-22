const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, instrument } = req.body;

    try{
        const userExists = await User.findOne({ username });
        if(userExists) { 
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password , 10);
        const user = new User({ username, password: hashPassword, instrument});
        await user.save();
        res.status(201).json({message: 'User signup successfully'});

    } 
    catch(err){
    res.status(500).json({message: 'Admin signup failed', error: err.message});

    } 
});

router.post('/admin/signup', async (req, res) => {
    const { username, password } = req.body;

    try{
        const hashPassword = await bcrypt.hash(password , 10);
        const admin = new User({ username, password:hashPassword, role:'admin'});
        await admin.save();
        res.status(201).json({message: 'Admin signup successfully'});
    } 
    catch(err){
        res.status(500).json({message: 'Admin signup failed', error: err.message});
    } 
});

router.post('/login', async (req,res) =>{
    const {username, password}= req.body;

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({ message: 'User not exists' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: 'User password invalid'});
        }
        const token = jwt.sign({userId: user._id ,role:user.role}, process.env.JWT_SECRET,{expiresIn:'1h'});
        const userData = user.role === 'admin' ? { username: user.username, role: user.role } : { username: user.username, role:user.role , instrument: user.instrument };
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'Strict',
        //     maxAge: 3600000 // 1 hour
        // });       
        res.status(200).json({ message: 'User login successfully', token, user: userData });
    }
    catch(err){
        res.status(500).json({error: 'User login failed'});

    }
});

module.exports = router;