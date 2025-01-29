const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config')

const authenticate = (req, res, next) =>{
    const token = req.header('Authorization')?.replace('Bearer ','');
    if (!token) return res.status(401).json({message: 'Acceso denegado'});

    try {
        const decoded = jwt.verify(token,jwtSecret);
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message: 'Token no válido'});
    }
}

module.exports = authenticate;