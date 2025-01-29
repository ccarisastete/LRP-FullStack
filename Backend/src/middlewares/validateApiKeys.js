const ApiKey = require('../models/ApiKey')

const validateApiKey = async (req,res,next) =>{
    const apiKey = req.header('x-api-key');
    if(!apiKey){
        return res.status(401).json({error:'Key no proporcionada'});
    }

    try{
        const keyDocuments = await ApiKey.findOne({key:apiKey})
        if(!keyDocuments){
            return res.status(403).json({error:'Key invalida'})
        }
        next();
    }catch(err){
        res.status(500).json({error:'Error en el servidor'})
    }
};

module.exports = validateApiKey;