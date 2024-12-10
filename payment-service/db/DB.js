const mongoose= require('mongoose');
require('dotenv').config();

const connectDB= ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Databse is connected');    
    }).catch((err)=>{
        console.log(err); 
    })
}

connectDB();

module.exports= connectDB;