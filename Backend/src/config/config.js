require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_Secret,
    jwtExpiration: process.env.JWT_Expiration,
    mongoUri: process.env.MONG_Uri,
    port: process.env.PORT,
    origin:process.env.ORIGIN
};