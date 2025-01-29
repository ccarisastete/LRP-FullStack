const express = require('express');
const router = express.Router();

const crypto = require('crypto');

const ApiKey = require('../models/ApiKey')

router.post('/key',async (req,res) =>{
    try{
        const {clientName} = req.body;
        const keyValidate = await ApiKey.findOne({clientName:clientName});
        if (keyValidate) return res.status(201).json({message:'Cliente ya registrado, intente con otro nombre o haga un get para obtener su clave'})
        const apiKey = crypto.randomBytes(32).toString('hex');
        const newApiKey = new ApiKey({key:apiKey,clientName:clientName})
        await newApiKey.save();
        res.status(200).json({message:`Key ${apiKey}`})
    }catch(err){
        res.status(400).json({error: err.message})
    }
});

router.get('/key', async (req,res)=>{
    const {clientName} = req.body;
    const keyValidate = await ApiKey.findOne({clientName:clientName})
    if(!keyValidate) return res.status(201).json({message:'Cliente no encontrado'});
    return res.status(200).json({message: `key ${keyValidate.key}`})
})

module.exports = router;