const express = require('express');
const router = express.Router();

const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const validateApiKey = require('../middlewares/validateApiKeys')
const authenticate = require('../middlewares/auth')

const {jwtSecret,jwtExpiration} = require('../config/config')

const Token = (user) =>{
    return jwt.sign(
        {id: user._id | null ,email:user.email,firstName:user.firstName,lastName:user.lastName,phone:user.phone},
        jwtSecret,
        {expiresIn:jwtExpiration}
    )
}

router.post('/register',validateApiKey, async (req, res) => {
    try{
        const {firstName, lastName, phone, email, password} = req.body;
        const user = new User({firstName, lastName, phone, email, password});
        const token = Token(user);
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({error:'El correo ya esta registrado'})
        await user.save();
        res.status(201).json({token,user});
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post('/login',validateApiKey, async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const token = Token(user);
        if (!user) return res.status(201).json({message:'Correo no registrado'});;
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) return res.status(201).json({message: 'Contraseña incorrecta'});

        res.status(200).json({token,user})
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.get('/checkAuth',validateApiKey, authenticate, (req, res) => {
    res.json(req.user);
}); 

module.exports = router;