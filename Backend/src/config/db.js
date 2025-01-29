const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connectDB = async () => {
    try{
        await mongoose.connect(mongoUri, {
            //userNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    }catch(err){
        console.error('Error al conectar con la base datos',err.message);
    }
};

module.exports = connectDB;